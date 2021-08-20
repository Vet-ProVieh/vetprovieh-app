import { ElementGroupBinding, VetproviehElement, VetproviehNavParams, WebComponent } from "@tomuench/vetprovieh-shared/lib";
import { Barn } from "../../barns";
import { RenderType } from "../../shared";
import { DynamicForm } from "../../shared/components/forms/dynamicForm";
import { Measure, MeasureField, MeasureGroup } from "../models";
import { MeasuresRepository } from "../repository";
import { MeasureGroupComponent } from "./measureGroup";
import { ObjectivesComponent } from "./objective";

/**
 * Controller for Page
 * pages/operations/plans/create or edit
 */
@WebComponent({
  template:
    VetproviehElement.template +
    ` 
    <form id="form">
        <vetprovieh-notification id="notification">
        </vetprovieh-notification>
        <div class="tabs  is-toggle is-fullwidth is-large">
          <ul>
            <li class="is-active">
              <a data-id="detail" data-state="execution">
                <span class="icon is-small"><i class="fas fa-scroll" aria-hidden="true"></i></span>
                <span class="is-hidden-touch">Planung</span>
              </a>
            </li>
            <li>
              <a data-id="objectives" data-state="execution">
                <span class="icon is-small"><i class="fas fa-toolbox" aria-hidden="true"></i></span>
                <span class="is-hidden-touch">Durchführung</span>
              </a>
            </li>
            <li>
              <a data-id="objectives" data-state="valuation">
                <span class="icon is-small"><i class="fas fa-star" aria-hidden="true"></i></span>
                <span class="is-hidden-touch">Bewertung</span>
              </a>
            </li>
          </ul>
        </div>
        <div id="detail" class="container">
        
          
        </div>
        <div id="objectives" class="panel is-hidden is-primary">
          <p class="panel-heading">
          Maßnahmen zur Verringerung des Antibiotika-Einsatzes
          </p>
        </div>
        
        <div class="container sticky-footer">
            <div class="columns is-mobile">
                <div class="column">
                    <input id="abortButton" 
                            class="button is-danger is-fullwidth" 
                            type="reset" value="Abbrechen">                   
                </div>
                <div class="column">
                    <input id="saveButton" 
                            class="button is-success is-fullwidth" 
                            type="button" value="Speichern">
                </div>
            </div>
        </div>
    </form>
    `,
  tag: "vp-measure",
})
export class MeasureComponent extends DynamicForm<Measure, MeasureGroup> {

  private repository: MeasuresRepository = new MeasuresRepository();
  private categories: HTMLAnchorElement[] = [];
  private objectivesComponent: ObjectivesComponent | undefined;

  constructor() {
    super("data", RenderType.Multiple);
    this.storeElement = true;
    this.src = "/service/measures";
  }

  /**
  * Run Callback
  */
  connectedCallback() {
    super.connectedCallback();
    this.registerTabEvents();
  }

  /**
   * Building a GroupComponent
   * must be implemented in Subclass
   * @return {ElementGroupBinding}
   */
  protected buildGroupComponent(): ElementGroupBinding {
    return new MeasureGroupComponent();
  }

  /**
   * Overwriteable Callback
   * @param {any} data
   * @protected 
   */
  _afterFetch(data: any) {

    let params = VetproviehNavParams.get("MeasureIntializeParams");

    this.setParamsToComponent(params);

    super._afterFetch(data);

    if (this.isNew()) {
      this.takeoverLastMeasure()
    }

    this.attachObjectivesComponent();
  }

  /**
   * Adding ObjectivesComponent to DOM
   */
  private attachObjectivesComponent() {
    this.objectivesComponent = new ObjectivesComponent();

    if (!Array.isArray(this.currentObject.objectives)) {
      this.currentObject.objectives = [];
    }
    this.objectivesComponent.objectives = this.currentObject.objectives;

    this.objectivesContainer.append(this.objectivesComponent);
  }

  /**
   * Tab-Buttons registrieren. 
   */
  private registerTabEvents() {
    this.shadowRoot?.querySelectorAll("a").forEach((a: HTMLAnchorElement) => {
      if (a) {
        this.categories.push(a);
        a.addEventListener("click", (event) => {
          this.activateTabAnchor(a);
          this.deactiveTabAnchors(a);
        });
      }
    })
  }

  /**
   * Mark Anchor as activated and remove hidden vor Tab
   * @param {HTMLAnchorElement} a 
   */
  private activateTabAnchor(a: HTMLAnchorElement) {
    let showId = a.dataset.id;
    a.parentElement?.classList.add("is-active");
    let element = this.shadowRoot?.querySelector(`#${showId}`);
    if (element) {
      element.classList.remove("is-hidden");
    }

    if (this.objectivesComponent) {
      this.objectivesComponent.state = a.dataset.state as string;
    }
  }

  /**
   * Mark Tab-Anchor as not active and hide other Elements
   * @param {HTMLAnchorElement} a 
   */
  private deactiveTabAnchors(a: HTMLAnchorElement) {
    let showId = a.dataset.id;
    this.categories.filter((x) => x != a).forEach((otherA) => {
      let showCatId = otherA.dataset.id;
      otherA.parentElement?.classList.remove("is-active");

      if (showId !== showCatId) {
        let element = this.shadowRoot?.querySelector(`#${showCatId}`);
        if (element) {
          element.classList.add("is-hidden");
        }
      }
    }, false);
  }

  private takeoverLastMeasure() {
    if (this.currentObject?.barn?.id) {
      this.repository.lastforBarn(+this.currentObject.barn.id).then((oldMeasure: Measure) => {
        oldMeasure.data.forEach((group: MeasureGroup) => {
          let currentGroup = this.currentObject.data.filter((g: MeasureGroup) => g.position === group.position)[0];
          if (currentGroup) {
            group.details.forEach((field: MeasureField) => {
              let currentField = currentGroup.details.filter((f) => f.position == field.position)[0];
              if (currentField) {
                currentField.value = field.value;
              }
            })
          }

        })
      }).catch((error) => {
        console.log("Es wrude kein vorheriger Maßnahmenplan gefunden");
      })
    }
  }

  /**
   * Get Objectives Container
   * @return {HTMLElement}
   */
  private get objectivesContainer(): HTMLElement {
    return this.shadowRoot?.querySelector("#objectives") as HTMLElement;
  }

  /**
   * on the new page?
   */
  private isNew(): boolean {
    return window.location.href.includes("new");
  }

  private setParamsToComponent(params: any) {
    if (params != null && params != undefined) {
      if (params.barnId != null && params.barnId != undefined) {
        this.currentObject.barn = { id: parseInt(params.barnId) } as Barn;
      }
      if (params.measuresDate != null && params.measuresDate != undefined) {
        this.currentObject.measuresDate = params.measuresDate;
      }
      if (params.therapyFrequency != null && params.therapyFrequency != undefined) {
        this.currentObject.therapyFrequency = params.therapyFrequency;
      }
    }
  }

}
