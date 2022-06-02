
import {
  ObjectHelper,
  VetproviehElement,
  WebComponent,
} from '@vetprovieh/vetprovieh-shared';
import {KeyResult, KeyResultMilestones} from '../../models/keyresult';

// eslint-disable-next-line new-cap
@WebComponent({
  template:
    VetproviehElement.template +
    `
    <div class="columns is-mobile">
        <div class="column" id="name">
            \${this.keyResult.name}
        </div>
        <div class="column is-one-third" style="text-align: right;">
            <button id="check" \${this._editable ? '' : 'disabled'}
            type="button"
            class="button small">
              <i class="fas fa-check" aria-hidden="true"></i>
            </button>
        </div>

    </div>
    <hr>
    `,
  tag: 'vp-key-result',
})
/**
 * Key-Result-Component
 */
export class KeyResultComponent extends VetproviehElement {
  private _keyResult: KeyResult = new KeyResult();
  private _editable = false;

  /**
   * Default-Constructor
   */
  constructor() {
    super(true, false);
  }

  /**
   * Getter editable
   * @return {string}
   */
  public get editable(): string {
    return this._editable.toString();
  }

  /**
   * Setter editable
   * @param {string} v
   */
  public set editable(v: string) {
    const vAsBool = ObjectHelper.stringToBool(v);
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

  /**
   * Getter keyResult
   * @return {KeyResult}
   */
  public get keyResult(): KeyResult {
    return this._keyResult;
  }

  /**
   * Setter keyResult
   * @param {KeyResult} val
   */
  public set keyResult(val: KeyResult) {
    if (this.keyResult !== val) {
      this._keyResult = val;
      this.render();
    }
  }

  /**
   * Render
   */
  render() {
    super.render();
    this.renderCurrentState();
    this.bindCheckKeyResultButton();
  }

  /**
   * Binding KeyResultButton
   */
  private bindCheckKeyResultButton() {
    this.checkKeyResultButton.addEventListener('click', () => {
      this.toggleState();
      this.renderCurrentState();
    });
  }

  /**
   * Button to Change key Result
   * @return {HTMLButtonElement}
   */
  private get checkKeyResultButton() : HTMLButtonElement {
    return this.shadowRoot?.getElementById('check') as HTMLButtonElement;
  }

  /**
   * Changiing state of milestone Attribute
   * Start -> Current -> Target
   */
  public toggleState() {
    switch (this._keyResult.milestones) {
      case 'Start':
      case KeyResultMilestones.Start:
        this.keyResult.milestones = KeyResultMilestones.Current;
        break;
      case 'Current':
      case KeyResultMilestones.Current:
        this._keyResult.milestones = KeyResultMilestones.Target;
        break;
      case 'Target':
      case KeyResultMilestones.Target:
        this._keyResult.milestones = KeyResultMilestones.Start;
        break;
      default:
        this.keyResult.milestones = KeyResultMilestones.Current;
        break;
    }
  }

  /**
   * Current Status rendern
   */
  private renderCurrentState() {
    switch (this._keyResult.milestones) {
      case KeyResultMilestones.Start:
        this.checkKeyResult.className = 'fas fa-check';
        this.checkKeyResult.style.color = 'black';
        break;
      case KeyResultMilestones.Current:
        this.checkKeyResult.className = 'fas fa-check-double';
        this.checkKeyResult.style.color = 'black';
        break;
      case KeyResultMilestones.Target:
        this.checkKeyResult.className = 'fas fa-check-double';
        this.checkKeyResult.style.color = '#03fc07';
        break;
      default:
        this.checkKeyResult.className = 'fas fa-check';
        this.checkKeyResult.style.color = 'black';
        break;
    }
  }

  /**
   * Load Button zum Verändern des Zustandes
   * @return {HTMLElement}
   */
  private get checkKeyResult() {
    return this.shadowRoot?.querySelector('i') as HTMLElement;
  }
}
