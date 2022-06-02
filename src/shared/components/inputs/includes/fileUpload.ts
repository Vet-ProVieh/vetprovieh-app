import {VetproviehElement, WebComponent} from '@vetprovieh/vetprovieh-shared';
import {Document, DocumentRepository} from '../../../../documents';

// eslint-disable-next-line new-cap
@WebComponent({
  template: VetproviehElement.template + `
            <div>
                <input id="uploadField"
                       class="is-hidden"
                       accept=".pdf,application/pdf" type="file"/>
            </div>
            <div>
                <button id="uploadButton" class="button">
                    Datei hochladen
                </button>
                <button id="button" disabled class="button is-info">
                    Datei öffnen
                </button>
            </div>
    `,
  tag: 'file-upload',
})
/**
 * FileUpload
 * ----------
 * A component to upload a file
 */
export class FileUpload extends VetproviehElement {
  protected _content: Blob | null = null;
  private _name = '';
  private _barnid = '';
  private _value: string | undefined;
  private _repository: DocumentRepository = new DocumentRepository();

  /**
   * ConnectedCallback
   */
  connectedCallback() {
    super.connectedCallback();

    this.uploadButton.addEventListener('click', () => {
      this.uploadInput.addEventListener('change',
          (event: any) => this.loadFile(event));
      this.uploadInput.click();
    });

    this.buttonOpen.addEventListener('click', () => {
      if (this.value) {
        this._repository.download(this.value).then((result) => {
          window.open(result, '_blank');
        }).catch((ex) => console.log(ex));
      }
    });
  }

  /**
     * Getter value
     * @return {string | undefined}
     */
  public get value(): string | undefined {
    return this._value;
  }

  /**
   * Setter value
   * @param {string | undefined} v
   */
  public set value(v: string | undefined) {
    if (this._value !== v && v !== undefined) {
      this._value = v;
      this.buttonOpen.disabled = false;
      this.dispatchEvent(new Event('change'));
    }
  }


  /**
   * Getter barnid
   * @return {string}
   */
  public get barnid(): string {
    return this._barnid;
  }

  /**
   * Setter barnid
   * @param {string} v
   */
  public set barnid(v: string) {
    if (this._barnid !== v) {
      this._barnid = v;
    }
  }

  /**
   * Get name
   * @return {string}
   */
  public get name(): string {
    return this._name;
  }

  /**
   * Set name
   * @param {string} v
   */
  public set name(v: string) {
    if (this._name !== v && v !== undefined) {
      this._name = v;
    }
  }

  /**
   * loadFile
   * @param {any} eventLoadFile
   */
  private loadFile(eventLoadFile: any) {
    const reader = new FileReader();
    reader.addEventListener('load', (event: any) => {
      const recordedContent = event.target.result;
      fetch(recordedContent)
          .then((result) => result.blob())
          .then((b) => {
            this._content = b;
            this.sendToServer(`fileUpload_${this.barnid}.pdf`);
          })
          .catch((e) => console.error(e));
    });

    reader.readAsDataURL(eventLoadFile.path[0].files[0]);
  }


  /**
    * Observed Attributes
    */
  static get observedAttributes() {
    return ['name', 'value', 'barnid'];
  }

  /**
 * Sending Dokument to Server
 * @param {string} filename
 */
  protected sendToServer(filename: string) {
    const document = new Document();
    document.barnId = this.barnid;
    document.content = this._content;
    document.name = filename;
    this._repository.create(document).then((url) => {
      this.value = url;
    }).catch((error) => error);
  }

  /**
   * Get Input from dom
   * @return {HTMLInputElement}
   */
  private get uploadInput(): HTMLInputElement {
    return this.getByIdFromShadowRoot('uploadField') as HTMLInputElement;
  }

  /**
* Get UploadButton from dom
* @return {HTMLButtonElement}
*/
  private get uploadButton(): HTMLButtonElement {
    return this.getByIdFromShadowRoot('uploadButton') as HTMLButtonElement;
  }


  /**
   * Get Button to Open from dom
   * @return {HTMLButtonElement}
   */
  private get buttonOpen(): HTMLButtonElement {
    return this.getByIdFromShadowRoot('button') as HTMLButtonElement;
  }
}
