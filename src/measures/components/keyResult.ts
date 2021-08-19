
import { WebComponent, VetproviehElement, ObjectHelper } from "@tomuench/vetprovieh-shared/lib";
import { ViewHelper } from "../../../www/bundle";
import { KeyResult, KeyResultMilestones } from "../models/keyresult";

/**
 * Controller for Page
 * pages/operations/plans/create or edit
 */
@WebComponent({
  template:
    VetproviehElement.template +
    `
    <div class="columns is-mobile">
        <div class="column" id="name">
            \${this.keyResult.name}
        </div>
        <div class="column is-one-third" style="text-align: right;">
            <button id="check" \${this._editable ? '' : 'disabled'} type="button" class="button small">
              <i class="fas fa-check"></i>
            </button>
        </div>   
             
    </div>
    <hr>
    `,
  tag: "vp-key-result",
})
export class KeyResultComponent extends VetproviehElement {

  private _keyResult: KeyResult = new KeyResult();
  private _editable: boolean = false;

  /**
   * Show editable Buttons or not
   * @property {string} editable
   */
  public get editable(): string {
    return this._editable.toString();
  }
  public set editable(v: string) {
    let vAsBool = ObjectHelper.stringToBool(v);
    if (this._editable !== vAsBool) {
      this._editable = vAsBool;
      this.toggleEditable();
    }
  }

  /**
   * Toggle internal DOM
   */
  private toggleEditable() {
    this.checkKeyResultButton.disabled = !this._editable;
  }

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

  /**
   * Binding KeyResultButton
   */
  private bindCheckKeyResultButton() {
    this.checkKeyResultButton.addEventListener("click", () => {
      this.toggleState();
      this.renderCurrentState();
    });
  }

  /**
   * Button to Change key Result
   * @return {HTMLButtonElement}
   */
  private get checkKeyResultButton() : HTMLButtonElement{
    return this.shadowRoot?.getElementById("check") as HTMLButtonElement;;
  }

  /**
   * Changiing state of milestone Attribute
   * Start -> Current -> Target
   */
  public toggleState() {
    switch (this._keyResult.milestones) {
      case "Start":
      case KeyResultMilestones.Start:
        this.keyResult.milestones = KeyResultMilestones.Current;
        break;
      case "Current":
      case KeyResultMilestones.Current:
        this._keyResult.milestones = KeyResultMilestones.Target;
        break;
      case "Target":
      case KeyResultMilestones.Target:
        this._keyResult.milestones = KeyResultMilestones.Start;
        break;
    }
  }

  /**
   * Current Status rendern
   */
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
    return this.shadowRoot?.querySelector("i") as HTMLElement;
  }
}
