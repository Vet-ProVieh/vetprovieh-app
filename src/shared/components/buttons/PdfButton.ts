import { VetproviehElement } from '@tomuench/vetprovieh-shared/lib';
import * as bulmaToast from 'bulma-toast';

export class PdfButton extends VetproviehElement {

    private repository : IPdfRepository;

    constructor(repository: IPdfRepository){
        super();
        this.repository = repository;
    }

    private _objectid: string = "";

    public get objectid(): string {
        return this._objectid;
    }
    public set objectid(v: string) {
        this._objectid = v;
    }

    connectedCallback() {
        this.pdfButton.addEventListener("click", () => {

            if(this.objectid) {
                this.repository.downloadPdf(this.objectid).then((value) => {
                    if (value) {
                        window.open(value, "_blank");
                    }
                })
            } else {
                bulmaToast.toast({
                    message: 'Bitte speichern Sie zunächst die Behandlung',
                    type: 'is-warning',
                    dismissible: false,
                    position: 'bottom-center',
                    animate: {in: 'fadeIn', out: 'fadeOut'},
                  });
            }
        })
    }


    static get observedAttributes() {
        return ['objectid'];
      }

    /**
     * Load PDF-Button
     * @return {HTMLButtonElement}
     */
    private get pdfButton(): HTMLButtonElement {
        return this.shadowRoot?.getElementById("button") as HTMLButtonElement;
    }


    /**
     * Load Template
     * @return {string}
     */
    public static get template(): string {
        return VetproviehElement.template + `
        <button id="button" class="button is-light is-fullwidth" aria-label="Load PDF file">
            <i class="fas fa-file-pdf"></i> <span style="padding-left:5px"> Als PDF laden </span>
        </button>`;
    }
}