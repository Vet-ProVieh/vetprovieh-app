import {
  VetproviehBinding,
  VetproviehElement,
  WebComponent} from '@vetprovieh/vetprovieh-shared';
import {SimpleModal} from '../../../shared';
import {KeyResult, Objective} from '../../models';
import {KeyResultEditComponent} from './keyResultEdit';

// eslint-disable-next-line new-cap
@WebComponent({
  tag: 'objective-modal',
  template: VetproviehElement.template + `
    <div id="modal" class="modal">
        <div class="modal-background"></div>
        <div class="modal-card">
        <header class="modal-card-head">
            <p class="modal-card-title">Maßnahme bearbeiten</p>
            <button id="closeButton" class="delete" aria-label="close"></button>
        </header>
        <section class="modal-card-body">
            <form id="form">
                <div id="objective">
                    <bulma-input property="name"
                        label="Bezeichnung der Maßnahme" required>
                    </bulma-input>

                    <bulma-input-checkbox property="welfare"
                       label="Tierwohl?"></bulma-input-checkbox>

                    <bulma-input type="date" property="date"
                    label="Durchzuführen bis" required>
                    </bulma-input>
                </div>
                <hr/>
                <div class="field">
                        <label class="label">Zwischenziele:</label>
                        <div class="control" id="keyResults">
                        </div>
                        <hr/>
                        <div>
                            <div class="button is-success" id="addKeyResult">
                                <i class="fas fa-plus"></i>
                                <span>Neues Zwischenziel hinzufügen</span>
                            </div>
                        </div>

                </div>
            </form>
        </section>
        <footer class="modal-card-foot">

            <div class="container">
                <div class="columns is-mobile">
                    <div class="column">
                        <button class="button is-danger is-fullwidth"
                             id="cancel">
                            <span class="icon">
                             <i class="fas fa-trash-alt" aria-hidden="true">
                             </i></span>
                            <span>Abbrechen</span>
                        </button>
                    </div>
                    <div class="column">
                        <button
                          class="button is-primary is-fullwidth" id="save">
                            <span class="icon">
                            <i class="fas fa-save" aria-hidden="true">
                            </i></span>
                            <span>Übernehmen</span>
                        </button>
                    </div>
                </div>
            </div>
        </footer>
        </div>
    </div>`,
})
/**
 * ObjectiveModal
 */
export class ObjectiveModal extends SimpleModal {
    private _objective: Objective = new Objective();

    /**
     * Setter objective
     * @param {Objective} v
     */
    public set objective(v: Objective) {
      if (this._objective !== v) {
        this._objective = v;
        VetproviehBinding.bindFormElements(
            this.getByIdFromShadowRoot('objective'),
            this._objective
        );
        this.renderKeyResults();
      }
    }

    /**
     * Getter objective
     * @return {Objective}
     */
    public get objective(): Objective {
      return this._objective;
    }

    /**
     * Rendering KeyResults to KeyResultEditComponent
     */
    private renderKeyResults() {
      this.keyResults.innerHTML = '';
      this.objective.keyResults.forEach((keyResult) => {
        this.appendKeyResult(keyResult);
      });
    }

    /**
     * Adding KeyResult to Dom and bind Listener
     * @param {KeyResult} keyResult
     */
    private appendKeyResult(keyResult: KeyResult) {
      const keyResultEdit = new KeyResultEditComponent();
      keyResultEdit.keyResult = keyResult;
      keyResultEdit.addEventListener('delete', (e: Event) => {
        const obj = (e as CustomEvent).detail as KeyResult;
        const index = this.objective.keyResults.indexOf(obj);
        this.objective.keyResults.splice(index, 1);
      });
      this.keyResults.append(keyResultEdit);
    }

    /**
     *  add Button Listeners
     */
    protected addButtonListeners() {
      const btnSave = this
          .shadowRoot?.getElementById('save') as HTMLButtonElement;
      btnSave.addEventListener('click', () => {
        if (this.validateInputs()) {
          this.dispatchEvent(
              new CustomEvent('save', {detail: this._objective}
              ));
          this.close();
        }
      });

      const addKeyResult = this
          .shadowRoot?.getElementById('addKeyResult') as HTMLElement;
      addKeyResult.addEventListener('click', () => {
        const keyResult = new KeyResult();
        this.objective.keyResults.push(keyResult);
        this.appendKeyResult(keyResult);
      });

      this.cancelButton.addEventListener('click', () => {
        this.close();
      });
    }

    /**
     * Get CancelButton
     * @return {HTMLButtonElement}
     */
    private get cancelButton() : HTMLButtonElement {
      return this.shadowRoot?.getElementById('cancel') as HTMLButtonElement;
    }

    /**
     * Validate inputs
     * Return True if Inputs are valid - return false
     * and render Inputs in red if invalid
     * @return {boolean}
     * */
    private validateInputs() : boolean {
      const form = this.getByIdFromShadowRoot('form') as HTMLFormElement;

      const validityOfKeyResults = this.checkValidityOfKeyResults();
      if (form.checkValidity() && validityOfKeyResults) {
        return true;
      } else {
        const invalid = form.querySelectorAll(':invalid');
        const valid = form.querySelectorAll(':valid');
        this.renderAsInvalid(invalid);
        this.renderAsValid(valid);
        return false;
      }
    }

    /**
     * Checking Validity of KeyResults
     * @return {boolean}
     */
    private checkValidityOfKeyResults(): boolean {
      let validity = true;
        this.shadowRoot?.querySelectorAll('vp-edit-key-result')
        .forEach((e: any) => {
          validity = validity && (e as KeyResultEditComponent).checkVailidity();
        });
        return validity;
    }

    /**
     * Render As Invalid
     * @param {NodeListOf<Element>} invalid
     */
    private renderAsInvalid(invalid: NodeListOf<Element>) {
      invalid.forEach((elem)=>{
        (elem as HTMLInputElement).classList.add('is-danger');
      });
    }

    /**
     * Render As valid
     * @param {NodeListOf<Element>} valid
     */
    private renderAsValid(valid: NodeListOf<Element>) {
      valid.forEach((elem)=>{
        (elem as HTMLInputElement).classList.remove('is-danger');
      });
    }

    /**
     * Connected-Callback
     */
    connectedCallback() {
      super.connectedCallback();
      this.objective = new Objective();
    }

    /**
     * Get KeyResults-Container Dom Element
     * @return {HTMLElement}
     */
    private get keyResults() {
      return this.shadowRoot?.getElementById('keyResults') as HTMLElement;
    }

    /**
     * get observed attributes
     * @return {string[]}
     */
    static get observedAttributes() : string[] {
      return ['objective'];
    }
}
