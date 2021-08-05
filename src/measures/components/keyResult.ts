
import { WebComponent, VetproviehElement } from "@tomuench/vetprovieh-shared/lib";
import { KeyResult, KeyResultMilestones } from "../models/keyresult";

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
            \${this.keyResult.name}
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

  private _keyResult: KeyResult = new KeyResult();

  public get keyResult(): KeyResult {
    return this._keyResult;
  }

  public set keyResult(val: KeyResult) {
    if (this.keyResult !== val) {
      this._keyResult = val;
      this.render();
    }
  }

  constructor() {
    super(true, false);
  }

  render() {
    super.render();
    this.renderCurrentState();
    this.bindCheckKeyResultButton();
  }

  private bindCheckKeyResultButton() {
    let checkKeyResult = this.shadowRoot?.getElementById("check") as HTMLElement;
    checkKeyResult.addEventListener("click", () => {
      this.toggleState();
      this.renderCurrentState();
    });
  }

  /**
   * Changiing state of milestone Attribute
   * Start -> Current -> Target
   */
  public toggleState() {
    switch (this._keyResult.milestones) {
      case KeyResultMilestones.Start:
        this.keyResult.milestones = KeyResultMilestones.Current;
        break;
      case KeyResultMilestones.Current:
        this._keyResult.milestones = KeyResultMilestones.Target;
        break;
      case KeyResultMilestones.Target:
        this._keyResult.milestones = KeyResultMilestones.Start;
        break;
    }
  }

  private renderCurrentState() {
    switch (this._keyResult.milestones) {
      case KeyResultMilestones.Start:
        this.checkKeyResult.className = "fas fa-check";
        this.checkKeyResult.style.color = "black";
        break;
      case KeyResultMilestones.Current:
        this.checkKeyResult.className = "fas fa-check-double";
        this.checkKeyResult.style.color = "black";
        break;
      case KeyResultMilestones.Target:
        this.checkKeyResult.className = "fas fa-check-double";
        this.checkKeyResult.style.color = "#03fc07";
        break;
    }
  }

  /**
   * Load Button zum Verändern des Zustandes
   * @return {HTMLElement}
   */
  private get checkKeyResult() {
    return this.shadowRoot?.getElementById("check") as HTMLElement;
  }
}
