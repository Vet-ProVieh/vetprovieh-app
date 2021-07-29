
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
    (this.shadowRoot?.getElementById("name") as HTMLElement).innerText = this.keyResult.name;
    let checkKeyResult = this.shadowRoot?.getElementById("check") as HTMLElement;
    checkKeyResult.addEventListener("click", () => {
      this.toggleState();
    });
  }

  private toggleState(){
    let checkKeyResult = this.shadowRoot?.getElementById("check") as HTMLElement;
    switch(this._keyResult.milestones){
      case "Start":
          this.keyResult.milestones = "Current";
          checkKeyResult.classList.remove(...checkKeyResult.classList);
          checkKeyResult.classList.add("fas");
          checkKeyResult.classList.add("fa-check-double");
          break;
      case "Current":
          this._keyResult.milestones = "Target";
          checkKeyResult.classList.remove(...checkKeyResult.classList);
          checkKeyResult.classList.add("fas");
          checkKeyResult.classList.add("fa-check-double");
          checkKeyResult.style.color = "#03fc07";
          break;
      case "Target":
          this._keyResult.milestones = "Start";
          checkKeyResult.classList.remove(...checkKeyResult.classList);
          checkKeyResult.classList.add("fas");
          checkKeyResult.classList.add("fa-check");
          checkKeyResult.style.color = "black";
          break;
      }
  }

  

}
