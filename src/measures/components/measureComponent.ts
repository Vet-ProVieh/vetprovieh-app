import { ViewHelper } from "@tomuench/vetprovieh-shared";
import { VetproviehBasicDetail } from "@tomuench/vetprovieh-detail/lib/index";
import { MeasureGroupComponent } from "./measureGroup";
import { WebComponent, VetproviehElement, VetproviehNavParams, ElementGroupBinding } from "@tomuench/vetprovieh-shared/lib";
import { Measure, MeasureGroup, Objective } from "../models";
import { Barn, BarnListShow } from "../../barns";
import { DynamicForm } from "../../shared/components/forms/dynamicForm";
import { RenderType } from "../../shared";
import { ObjectivesComponent } from "./objectivesComponent";

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
  
  constructor() {
    super("data", RenderType.Multiple);
    this.storeElement = true;
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

    

    //Vorgehensweise Integration Objectives - KeyResults
    let obj = this.shadowRoot?.getElementById("objectives") as ObjectivesComponent;
    obj.objectives = [];
    //obj.objects = this.currentObject.objectives;
  }


  private setParamsToComponent(params: any) {
    
    console.log("Setting barnid");
    if(params != null && params != undefined){
      if (params.barnId != null && params.barnId != undefined) {
        this.currentObject.barn = {id: parseInt(params.barnId)} as Barn;
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
