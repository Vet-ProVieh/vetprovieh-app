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
    <div class="columns is-centered">
        <div class="column is-two-thirds is-centered">
            <div class="card">
                <header class="card-header">
                    <p class="card-header-title is-centered" id="name">
                        Card header
                    </p>
                    <button class="card-header-icon" aria-label="more options">
                        <span class="icon">
                            <i class="fas fa-angle-down" aria-hidden="true"></i>
                        </span>
                    </button>
                </header>
            </div>
        </div>
    </div>
    `,
  tag: "vp-objective-item",
})
export class ObjectiveItemComponent extends VetproviehElement {

  private _objective:Objective = new Objective();
  
  public get objective() : Objective {
    return this._objective;
  }

  public set objective(val: Objective){
    this._objective = val;
    //UI kann auf Veränderungen reagieren
    this.render();
  }


  constructor() {
    super();
  }

  connectedCallback(){
    console.log(this.objective);
    this.setAttributes();
  }

  private setAttributes(){
      (this.shadowRoot?.getElementById("name") as HTMLElement).innerText = this.objective.name
  }


  

}
