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
        <div class="columns is-mobile">
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

  private _objectives:Objective[] = [];
  
  
  public get objectives() : Objective[] {
    return this._objectives;
  }

  public set objectives(val: Objective[]){
    this._objectives = val;
    this.renderObjectives();
  }


  constructor() {
    super();
  }

  renderObjectives() {

    let container = this.objectivesContainer();
    container.innerHTML = "";
    if(this.objectives){
      this.objectives.forEach((objective) => this.addObjective(objective));
    }
  }

  private addObjective(objective: Objective){
    let container = undefined;
    if(objective.welfare){
      container = this.welfareContainer();
    }else{
      container = this.antibioticsContainer();
    }
    let objectiveItem = new ObjectiveItemComponent();
    objectiveItem.objective = objective;
    container.appendChild(objectiveItem);

  }

  private objectivesContainer() : HTMLElement {
    return this.shadowRoot?.getElementById("objectives") as HTMLElement;
  }

  private welfareContainer() : HTMLElement {
    return this.shadowRoot?.getElementById("welfare") as HTMLElement;
  }

  private antibioticsContainer() : HTMLElement {
    return this.shadowRoot?.getElementById("antibiotics") as HTMLElement;
  }

  connectedCallback(){
    console.log(this.objectives);
    let btnAddMeasure = this.shadowRoot?.getElementById("addMeasure") as HTMLButtonElement;
    btnAddMeasure.addEventListener("click", () => {
      let modal = this.shadowRoot?.getElementById("modal") as ObjectiveModal;
      modal.active = true;
    });

    


    let modal = this.shadowRoot?.getElementById("modal") as HTMLButtonElement;
    modal.addEventListener("save", (event: Event) => {
      let object = (event as CustomEvent).detail;
      if(object){
        this.addObjective(object);
      }
    });
  }


  

}
