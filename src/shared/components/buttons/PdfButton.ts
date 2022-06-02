import {VetproviehElement} from '@vetprovieh/vetprovieh-shared';
import * as bulmaToast from 'bulma-toast';

/**
 * Generate a PDF with a Button
 */
export class PdfButton extends VetproviehElement {
  private repository: IPdfRepository;
  private _objectid = '';
  /**
   * Default_Constructor
   * @param {IPdfRepository} repository
   */
  constructor(repository: IPdfRepository) {
    super();
    this.repository = repository;
  }

  /**
   * Getter objectid
   * @return {string}
   */
  public get objectid(): string {
    return this._objectid;
  }

  /**
   * Setter objectid
   * @param {string} v
   */
  public set objectid(v: string) {
    if (this._objectid !== v) {
      this._objectid = v;
    }
  }

  /**
   * Connected-Callback
   */
  connectedCallback() {
    this.pdfButton.addEventListener('click', () => {
      if (this.objectid) {
        this.downloadPdfAndOpen();
      } else {
        bulmaToast.toast({
          message: 'Bitte speichern Sie zunächst die Behandlung',
          type: 'is-warning',
          dismissible: false,
          position: 'bottom-center',
          animate: {in: 'fadeIn', out: 'fadeOut'},
        });
      }
    });
  }

  /**
   * Download the pdf file and open
   */
  private async downloadPdfAndOpen() {
    const value = await this.repository.downloadPdf(this.objectid);

    if (value) {
      window.open(value, '_blank');
    }
  }

  /**
   * Get observed Attributes
   * @return {string[]}
   */
  static get observedAttributes() : string[] {
    return ['objectid'];
  }

  /**
   * Load PDF-Button
   * @return {HTMLButtonElement}
   */
  private get pdfButton(): HTMLButtonElement {
    return this.shadowRoot?.getElementById('button') as HTMLButtonElement;
  }


  /**
   * Load Template
   * @return {string}
   */
  public static get template(): string {
    return VetproviehElement.template + `
        <button id="button" 
            class="button is-light is-fullwidth" aria-label="Load PDF file">
            <i class="fas fa-file-pdf" aria-hidden="true"></i> 
            <span style="padding-left:5px"> PDF laden </span>
        </button>`;
  }
}
