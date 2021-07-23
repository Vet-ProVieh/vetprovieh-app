import { ViewHelper } from "@tomuench/vetprovieh-shared";
import { VetproviehBasicDetail } from "@tomuench/vetprovieh-detail/lib/index";
import { MeasureGroupComponent } from "./measureGroup";
import { WebComponent, VetproviehElement, VetproviehNavParams, ElementGroupBinding } from "@tomuench/vetprovieh-shared/lib";
import { Measure, MeasureGroup } from "../models";
import { Barn, BarnListShow } from "../../barns";
import { DynamicForm } from "../../shared/components/forms/dynamicForm";
import { ObjectiveModal, RecordingVideoModal, RenderType } from "../../shared";
import { Objective } from "../models/objective";
import { ObjectiveItemComponent } from "./objectiveItem";

/**
 * Controller for Page
 * pages/operations/plans/create or edit
 */
@WebComponent({
  template:
    VetproviehElement.template +
    ` 
    <div id="group">
        <div id="detail" class="container">
          <div class="columns is-mobile mx-2">
              <div class="column">
                <input id="loadMeasure" 
                        class="button is-link is-fullwidth" 
                        type="button" value="Maßnahmen laden">                   
              </div>
              <div class="column">
                <input id="addMeasure" 
                        class="button is-info is-fullwidth" 
                        type="button" value="Maßnahme manuell einfügen">
              </div>
            </div>
        </div>
        <hr/>
        <div id="objectives">
          <h4 class="subtitle is-4">Antibiotika Maßnahmen</h4>
          <div id="antibiotics">

          </div>
          <br>
          <h4 class="subtitle is-4">Tierwohl Maßnahmen</h4>
          <div id="welfare">

          </div>
        </div>
        <objective-modal id="modal"></objective-modal>
    </div>
    `,
  tag: "vp-objectives",
})
export class ObjectivesComponent extends VetproviehElement {

  private _objectives: Objective[] = [];


  public get objectives(): Objective[] {
    return this._objectives;
  }

  public set objectives(val: Objective[]) {
    this._objectives = val;
    this.renderObjectives();
  }


  constructor() {
    super();
  }


  /**
   * Connected-Callback
   */
  connectedCallback() {
    this.bindManualAddButton();
    this.configureModal();
  }

  /**
   * Rendering objectives First Time
   */
  renderObjectives() {
    let container = this.objectivesContainer();
    container.innerHTML = "";
    this.objectives?.forEach((objective) => this.addObjective(objective));
  }

  /**
   * Adding Objective to Container
   * @param {Objective} objective 
   */
  private addObjective(objective: Objective) {
    let objectiveItem = new ObjectiveItemComponent();
    objectiveItem.objective = objective;
    this.selectContainer(objective)?.appendChild(objectiveItem);
  }

  /**
   * Select Display-Container
   * @param {Objective} objective 
   * @returns {HTMLElement}
   */
  private selectContainer(objective: Objective): HTMLElement {
    if (objective.welfare) {
      return this.welfareContainer();
    } else {
      return this.antibioticsContainer();
    }
  }

  /**
   * Get Objectives-DOM-Element
   * @returns {HTMLElement}
   */
  private objectivesContainer(): HTMLElement {
    return this.shadowRoot?.getElementById("objectives") as HTMLElement;
  }

  /**
   * Get Welfare-DOM-Element
   * @returns {HTMLElement}
   */
  private welfareContainer(): HTMLElement {
    return this.shadowRoot?.getElementById("welfare") as HTMLElement;
  }

  /**
   * Get Antibiotics-DOM-Element
   * @returns {HTMLElement}
   */
  private antibioticsContainer(): HTMLElement {
    return this.shadowRoot?.getElementById("antibiotics") as HTMLElement;
  }

  /**
  * Get Manual-AddButton-DOM-Element
  * @returns {HTMLElement}
  */
  private get manualAddButton(): HTMLButtonElement {
    return this.shadowRoot?.getElementById("addMeasure") as HTMLButtonElement;
  }


  /**
  * Get Objectives-Modal-DOM-Element
  * @returns {HTMLElement}
  */
  private get objectivesModal(): ObjectiveModal {
    return this.shadowRoot?.getElementById("modal") as ObjectiveModal;
  }

  /**
   * Bind Click Event to Manual Add button
   */
  private bindManualAddButton() {
    this.manualAddButton?.addEventListener("click", () => {
      this.objectivesModal.active = true;
    });
  }

  /**
   * Configuring Callback from Modal
   */
  private configureModal() {
    this.objectivesModal?.addEventListener("save", (event: Event) => {
      let object = (event as CustomEvent).detail;
      if (object) {
        this.addObjective(object);
      }
    });
  }


}
