import { VetproviehElement, WebComponent} from '@tomuench/vetprovieh-shared/lib';
import { MeasuresRepository } from "../repository";


@WebComponent({
    template: VetproviehElement.template + `
        <button id="button" style="z-index:2000" class="button is-light is-fullwidth" aria-label="Load PDF file">
            <i class="fas fa-file-pdf"></i> <span style="padding-left:5px" class="is-hidden-touch"> Als PDF laden </span>
        </button>
    `,
    tag: "measure-pdf-button"
})
export class MeasurePdfButton extends VetproviehElement {

    private repository = new MeasuresRepository();

    private _measureid: string = "";

    public get measureid(): string {
        return this._measureid;
    }
    public set measureid(v: string) {
        this._measureid = v;
    }

    connectedCallback() {
        this.pdfButton.addEventListener("click", () => {
            this.repository.downloadPdf(this.measureid).then((value) => {
                if (value) {
                    window.open(value, "_blank");
                }
            })
        })
    }


    private get pdfButton(): HTMLButtonElement {
        return this.shadowRoot?.getElementById("button") as HTMLButtonElement;
    }


}