import { BaseRepository, ElementBinding, WebComponent } from "@tomuench/vetprovieh-shared/lib";
import { VetproviehSelect } from "../../app/main";
import { InputFactory } from "../../careplans/operational/components/field/inputFactory";

/**
 * Pager OperationField
 */
@WebComponent({
    template: undefined,
    tag: 'vp-measure-field'
})
export class MeasureFieldComponent extends ElementBinding {

    private _isValid: boolean = false;

    constructor() {
        super();
    }

    /**
     * is MeasureField valid
     * @return {Boolean}
     */
    get isValid(): boolean {
        let x : HTMLFormElement;
        return this._isValid;
    }


    /**
     * Getting Repository for element
     * @param {string} src 
     * @return {BaseRepository | undefined}
     */
    private getChoiceRepository(src: string): BaseRepository<any> | undefined {
        switch (src) {
            default:
                return undefined;
        }
    }

    /**
    * Callback to Overwrite
    * @protected
    */
    protected _afterRender() {
        if (this.object.choiceSrc) {
            let vetproviehSelect = this.querySelector("vetprovieh-select") as VetproviehSelect;
            if (vetproviehSelect) {
                let repository = this.getChoiceRepository(this.object.choiceSrc);
                if (repository) vetproviehSelect.repository = repository;
            }
        }

        this.addValidListener();
    }

    private addValidListener() {
            let input = this.querySelector("[property='value']") as HTMLTextAreaElement;
            if (input) {
                this.addEventListener("change", () => {
                    console.log("changef field measure: " + input.checkValidity());
                    this._isValid = input.checkValidity()
                });
                this._isValid = input.checkValidity()
            }
    }

    public attachValue(value: any) {
        if (this.object.detailsType == "textArea") {
            let inputfield = this.querySelector("textarea") as HTMLTextAreaElement;
            if (inputfield) {
                inputfield.value += `${value}\r\n`;
            }
        }
    }

    /**
     * Returning template
     * @return {string}
     */
    get template(): string {
        if (this.object) {
            return super.template + `
            <div class="field is-horizontal" style="margin-top:5px; margin-bottom:5px">
                <div class="field-label">
                    <label class="label">{{name}}</label>
                </div>
                <div class="field-body">
                    <div class="field">` +
                InputFactory.generateField(this.object.detailsType, this.object) +
                `   </div>
                </div>
            </div>
            <hr/>`;

        } else {
            return '';
        }
    }
}