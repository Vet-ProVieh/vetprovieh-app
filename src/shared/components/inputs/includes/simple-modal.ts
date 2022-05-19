import {VetproviehElement} from '@tomuench/vetprovieh-shared/lib';
import {Global} from '../../../components/basics';

/**
 * Simple-Modal
 * ------------
 * Shows a title and a body. user can accept or decline.
 */
export class SimpleModal extends VetproviehElement {
    private _active = false;
    private _title = '';
    protected _content: Blob | null = null;


    protected isMobile = Global.isMobile;

    /**
     * Get Title
     * @return {string}
     */
    public get title(): string {
      return this._title;
    }

    /**
     * Set Title
     * @param {string} v
     */
    public set title(v: string) {
      if (this._title !== v) {
        this._title = v;
      }
    }

    /**
     * Getter Active
     * @return {boolean}
     */
    public get active(): boolean {
      return this._active;
    }

    /**
     * Setter Active
     * @param {boolean} v
     */
    public set active(v: boolean) {
      if (this._active !== v) {
        this._active = v;
        if (v) {
          this.modalBox.classList.add('is-active');
        } else {
          this.modalBox.classList.remove('is-active');
        }
      }
    }


    /**
     * Conencted-Callback
     * - Bindings and so on
     */
    connectedCallback() {
      super.connectedCallback();

      const closeFunc = () => {
        this.close();
      };
      closeFunc.bind(this);
      this.closeButton.addEventListener('click', closeFunc);

      this.addButtonListeners();
    }

    /**
     * Adding Listener to Buttons
     */
    protected addButtonListeners() {
      throw new Error('Please implement');
    }

    /**
     * Get Content from Modal
     * @return {Blob|null}
     */
    public loadContent(): Blob | null {
      return this._content;
    }

    /**
     * Closing Modal
     * @param {boolean} takeover
     */
    public close(takeover = false) {
      console.debug(`Takeover = ${takeover}`);
      this.active = false;

      this.dispatchEvent(new CustomEvent('close'));
      this.reset();
    }

    /**
     * Overwrite in Subclasses
     * Resets Modal
     */
    protected reset() {
      console.debug('Simple-Modal reset');
    }

    /**
     * Get Save-Button
     * @return {HTMLButtonElement}
     */
    protected get saveButton(): HTMLButtonElement {
      return this.shadowRoot?.getElementById('save') as HTMLButtonElement;
    }


    /**
    * Gettings closeButton
    * @return {HTMLButtonElement}
    */
    private get closeButton(): HTMLButtonElement {
      return this.getByIdFromShadowRoot('closeButton') as HTMLButtonElement;
    }

    /**
     * Getting ModalBox
     * @return {HTMLElement}
     */
    private get modalBox(): HTMLElement {
      return this.getByIdFromShadowRoot('modal') as HTMLElement;
    }

    /**
     * Observed Attributes
     */
    static get observedAttributes() {
      return ['type', 'title'];
    }
}
