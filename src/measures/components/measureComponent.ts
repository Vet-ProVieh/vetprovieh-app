import { ViewHelper } from "@tomuench/vetprovieh-shared";
import { VetproviehBasicDetail } from "@tomuench/vetprovieh-detail/lib/index";
import { MeasureGroupComponent } from "./measureGroup";
import { WebComponent, VetproviehElement, VetproviehNavParams, ElementGroupBinding } from "@tomuench/vetprovieh-shared/lib";
import { Measure, MeasureField, MeasureGroup, Objective } from "../models";
import { Barn, BarnListShow } from "../../barns";
import { DynamicForm } from "../../shared/components/forms/dynamicForm";
import { RenderType } from "../../shared";
import { ObjectivesComponent } from "./objectivesComponent";
import { MeasuresRepository } from "../repository";

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
              <a data-id="detail">
                <span class="icon is-small"><i class="fas fa-scroll" aria-hidden="true"></i></span>
                <span>Planung</span>
              </a>
            </li>
            <li>
              <a data-id="group">
                <span class="icon is-small"><i class="fas fa-toolbox" aria-hidden="true"></i></span>
                <span>Durchführung</span>
              </a>
            </li>
            <li>
              <a data-id="group">
                <span class="icon is-small"><i class="fas fa-star" aria-hidden="true"></i></span>
                <span>Bewertung</span>
              </a>
            </li>
          </ul>
        </div>
        <div id="detail" class="container">
        
          
        </div>
        <div id="group" class="panel is-primary">
          <p class="panel-heading">
          Maßnahmen zur Verringerung des Antibiotika-Einsatzes
          </p>
          <br>
          
          <vp-objectives id="objectives">
          </vp-objectives>
        </div>
        
        <hr/>
        <div class="container">
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

  constructor() {
    super("data", RenderType.Multiple);
    this.storeElement = true;
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
    
  }

  private registerTabEvents() {
    console.log("REGISTER TAB EVENTS");
    this.querySelectorAll("a").forEach((element: any) => {
      console.log(element);
      let a = element as any;
      if(a) {
        this.categories.push(a);
        a.addEventListener("click",(event) => {
          console.log("CLICKED");
          let showId = a.dataset.id;
          a.classList.add("is-active");
          let element = this.querySelector(`#${showId}`);
          if(element) {
            element.classList.remove("is-hidden");
          }

          this.categories.filter((x) => x != a).forEach((otherA) => {
            let showId = otherA.dataset.id;
            otherA.classList.remove("is-active");
            let element = this.querySelector(`#${showId}`);
            if(element) {
              element.classList.add("is-hidden");
            }
          }, false);
        });
      }
    })
  }

  private takeoverLastMeasure() {
    if (this.currentObject?.barn?.id) {
      this.repository.lastforBarn(+this.currentObject.barn.id).then((oldMeasure: Measure) => {
        oldMeasure.data.forEach((group:MeasureGroup) => {
          let currentGroup = this.currentObject.data.filter((g:MeasureGroup) => g.position === group.position)[0];
          if(currentGroup) {
            group.details.forEach((field: MeasureField) => {
              let currentField = currentGroup.details.filter((f) =>  f.position == field.position)[0];
              if(currentField) {
                currentField.value = field.value; 
              }
            })
          }
          
        })
      }).catch((error) => {
        alert("Es ist ein Fehler aufgetreten beim Abruf");
      })
    }
  }

  /**
   * on the new page?
   */
  private isNew(): boolean {
    return window.location.href.includes("new");
  }

  private setParamsToComponent(params: any) {

    console.log("Setting barnid");
    if (params != null && params != undefined) {
      if (params.barnId != null && params.barnId != undefined) {
        this.currentObject.barn = { id: parseInt(params.barnId) } as Barn;
        console.log("barnid set");
      }
      if (params.measuresDate != null && params.measuresDate != undefined) {
        this.currentObject.measuresDate = params.measuresDate;
        console.log("measuresDate set");
      }
      if (params.therapyFrequency != null && params.therapyFrequency != undefined) {
        this.currentObject.therapyFrequency = params.therapyFrequency;
        console.log("TF set");
      }
    }
    console.log("OBJ:" + JSON.stringify(this.currentObject));
  }

}
