import { BaseRepository, ElementBinding, ViewHelper, WebComponent } from "@tomuench/vetprovieh-shared/lib";
import { VetproviehSelect } from "../../app/main";
import { InputFactory } from "../../careplans/operational/components/field/inputFactory";
import { MeasureField } from "../models";

/**
 * MeasureField Display-Component
 */
@WebComponent({
    template: undefined,
    tag: 'vp-measure-field'
})
export class MeasureFieldComponent extends ElementBinding {

    private _linkedField: MeasureFieldComponent | undefined;
    private _isValid: boolean = false;

    constructor() {
        super();
    }

    /**
     * Getting Linked Element to this Field
     * @return {MeasureFieldComponent | undefined}
     */
    public get linkedField(): MeasureFieldComponent | undefined {
        return this._linkedField;
    }


    /**
     * Link Field to another
     * @param field 
     */
    public linkToField(field: MeasureFieldComponent) {
        if (field) {
            this._linkedField = field;
            this.evaluteLinkedValue(field.object.value);

            field.addEventListener("change", (event) => {
                let e = event as CustomEvent;
                if (e) {
                    this.evaluteLinkedValue(e.detail);
                }
            })
        }
    }

    /**
     * Evaluate required and visiblity in dependency of the linked value
     * @param {any} value 
     */
    private evaluteLinkedValue(value: any) {
        let obj = this.object as MeasureField
        let shouldShow = obj.linkPosition?.value == value;
        ViewHelper.toggleVisibility(this, shouldShow);
        this.inputField.required = shouldShow;
    }

    /**
     * is MeasureField valid
     * @return {Boolean}
     */
    get isValid(): boolean {
        let x: HTMLFormElement;
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

    /**
     * Adding Event Listener for Validity to trace changes
     */
    private addValidListener() {
        let input = this.inputField;
        if (input) {
            input.addEventListener("change", (event) => {
                this.dispatchEvent(new CustomEvent("change", { detail: (event.target as any).value }));
                this._isValid = input.checkValidity()
            });
            this._isValid = input.checkValidity()
        }
    }

    /**
     * Load InputField
     * @return {HTMLInputElement}
     */
    private get inputField(): HTMLInputElement {
        return this.querySelector("[property='value']") as HTMLInputElement;
    }

    /**
     * Attaching Value from Takeover
     * @param {any} value 
     */
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