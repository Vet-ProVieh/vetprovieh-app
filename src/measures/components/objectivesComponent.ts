import { ViewHelper } from "@tomuench/vetprovieh-shared";
import { VetproviehBasicDetail } from "@tomuench/vetprovieh-detail/lib/index";
import { MeasureGroupComponent } from "./measureGroup";
import { WebComponent, VetproviehElement, VetproviehNavParams, ElementGroupBinding } from "@tomuench/vetprovieh-shared/lib";
import { Measure, MeasureGroup } from "../models";
import { Barn, BarnListShow } from "../../barns";
import { DynamicForm } from "../../shared/components/forms/dynamicForm";
import { RenderType } from "../../shared";
import { Objective } from "../models/objective";

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
          <vp-objective-item></vp-objective-item>
        </div>
        
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
    //UI kann auf Veränderungen reagieren
    this.render();
  }


  constructor() {
    super();
  }

  connectedCallback(){
    console.log(this.objectives);
  }


  

}
