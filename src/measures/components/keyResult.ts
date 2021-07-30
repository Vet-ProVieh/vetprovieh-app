
import { WebComponent, VetproviehElement } from "@tomuench/vetprovieh-shared/lib";
import { KeyResult } from "../models/keyresult";
import { Objective } from "../models/objective";

/**
 * Controller for Page
 * pages/operations/plans/create or edit
 */
@WebComponent({
  template:
    VetproviehElement.template +
    `
    <div class="columns">
        <div class="column" id="name">
            Ich bin ein KeyResult
        </div>
        <div class="column is-one-third" style="text-align: right;">
            <i class="fas fa-check" id="check" style="cursor: pointer;"></i>
        </div>   
             
    </div>
    <hr>
    `,
  tag: "vp-key-result",
})
export class KeyResultComponent extends VetproviehElement {

  private _keyResult:KeyResult = new KeyResult();
  
  public get keyResult() : KeyResult {
    return this._keyResult;
  }

  public set keyResult(val: KeyResult){
    this._keyResult = val;
    //UI kann auf Veränderungen reagieren
    this.render();
  }


  constructor() {
    super();
  }

  connectedCallback(){
    this.renderCurrentState();
    (this.shadowRoot?.getElementById("name") as HTMLElement).innerText = this.keyResult.name;
    let checkKeyResult = this.shadowRoot?.getElementById("check") as HTMLElement;
    checkKeyResult.addEventListener("click", () => {
      this.toggleState();
      this.renderCurrentState();
    });
  }

  private toggleState(){
    switch(this._keyResult.milestones){
      case "Start":
          this.keyResult.milestones = "Current";
          break;
      case "Current":
          this._keyResult.milestones = "Target";
          break;
      case "Target":
          this._keyResult.milestones = "Start";
          break;
      }
  }

  private renderCurrentState(){
    switch(this._keyResult.milestones){
      case "Start":
          this.checkKeyResult.className = "fas fa-check-double";
          break;
      case "Current":
          this.checkKeyResult.className = "fas fa-check-double";
          this.checkKeyResult.style.color = "#03fc07";
          break;
      case "Target":
          this.checkKeyResult.className = "fas fa-check";
          this.checkKeyResult.style.color = "black";
          break;
      }
  }

  private get checkKeyResult() {
    return this.shadowRoot?.getElementById("check") as HTMLElement;
  }

  

}
