import {VetproviehBinding, VetproviehElement, WebComponent} from '@tomuench/vetprovieh-shared/lib';
import {QuestionModal} from '../../../shared';
import {KeyResult} from '../../models';

/**
 * Component to Edit KeyResult
 */
@WebComponent({
  template:
    VetproviehElement.template +
    `
      <div class="columns is-mobile">
          <div class="column">
              <input property="name" class="input" placeholder="Bitte geben Sie ihr Zwischenziel ein" type="text" required/>
          </div>
          <div class="column is-2">
            <div class="buttons">
              <button class="button is-danger" id="delete">
                  <i class="fas fa-trash-alt"></i>
              </button>
            </div>
          </div>
      </div>
    `,
  tag: 'vp-edit-key-result',
})
export class KeyResultEditComponent extends VetproviehElement {
  private _keyResult: KeyResult = new KeyResult();

  constructor() {
    super();
  }
  public get keyResult(): KeyResult {
    return this._keyResult;
  }

  public set keyResult(val: KeyResult) {
    if (this._keyResult !== val) {
      this._keyResult = val;

      if (this.shadowRoot) {
        VetproviehBinding.bindFormElements(this.shadowRoot.querySelector('.columns'), this.keyResult,);
      }
    }
  }

  public render() {
    super.render();
    this.registerButtons();
  }

  public checkVailidity(): boolean {
    console.log('CHECK_VALIDITY KeyResultEdit');
    const input = this.shadowRoot?.querySelector('input');
    if (input) {
      const valid = input.checkValidity();
      if (valid) input.classList.remove('is-danger');
      else input.classList.add('is-danger');

      return valid;
    } else {
      return false;
    }
  }

  /**
   * Delete KeyResult, Dispatch Event and delete DOM-Element
   */
  public delete() {
    this.dispatchEvent(new CustomEvent('delete', {detail: this.keyResult}));
    this.remove();
  }

  /**
   * Register EventListeners to Buttons
   */
  private registerButtons() {
    this.deleteButton.addEventListener('click', () => {
      QuestionModal.askQuestion('Entfernen?', 'Möchten Sie das Zwischenziel entfernen?').then((result) => {
        if (result) {
          this.delete();
        }
      });
    });
  }

  /**
   * Delete-Button from DOM
   * @return {HTMLButtonElement}
   */
  private get deleteButton(): HTMLButtonElement {
    return this.getByIdFromShadowRoot('delete') as HTMLButtonElement;
  }
}
