import { WebComponent, VetproviehElement, Indexable, VetproviehBinding } from "@tomuench/vetprovieh-shared/lib";
import { CareplanField } from "../models/careplanField";
import { FieldOptions } from "../models/field_options";


@WebComponent({
    template: VetproviehElement.template + `

    <div id="specificFields">

    </div>
    `,
    tag: 'select-field-type'
})
export class SelectFieldType extends VetproviehElement {

    private _fieldType: string | undefined;


    /**
      * Observed Attributes
      */
    static get observedAttributes() {
        return ['fieldtype'];
    }

    constructor() {
        super(false, false);
        this.render();
    }


    /**
     * Getter Fieldtype
     * @return {string}
     */
    public get fieldtype(): string {
        return this._fieldType || "";
    }

    /**
     * Setter FieldType
     * @param {string} val
     */
    public set fieldtype(val: string) {
        if (val !== this._fieldType) {
            this._fieldType = val;
        }
    }

    public render() {
        super.render();
        if (this.fieldtype) {
            this.createAndAttachFields(this.fieldtype);
        }
    }

    private createAndAttachFields(fieldType: string) {

        let fieldsWithOptions = CareplanField.TYPES[fieldType];
        if (fieldsWithOptions) {
            Object.keys(fieldsWithOptions).forEach((propertyKey) => {
                let options: FieldOptions = fieldsWithOptions[propertyKey];
                let field: HTMLInputElement = this.createField(propertyKey, options);
                let label: HTMLLabelElement = this.buildLabel(propertyKey);

                this.bindInput(field);

                if (options.type === "checkbox") {
                    label.classList.add(options.type);
                    label.classList.replace("label","checkbox");
                    label.insertBefore(field, label.firstChild);
                    this.specificFields.append(label);
                } else {
                    this.specificFields.append(label);
                    this.specificFields.append(this.wrapControl(field));
                }
            });
        }
    }

    private bindInput(field: HTMLInputElement) {
    }

    private buildLabel(propertyKey: string): HTMLLabelElement {
        let label: HTMLLabelElement = document.createElement("label");
        label.classList.add("label");
        label.innerHTML = propertyKey; // TODO Übersetzung
        return label;
    }

    private wrapControl(field: HTMLInputElement): HTMLDivElement {
        let controlDiv: HTMLDivElement = document.createElement("div");
        controlDiv.classList.add("control");
        controlDiv.append(field);
        return controlDiv;
    }

    /**
     * Creating new Field
     * @param {string} propertyKey 
     * @param {FieldOptions} options 
     * @return {HTMLDivElement}
     */
    private createField(propertyKey: string, options: FieldOptions): HTMLInputElement {
        let field: HTMLInputElement = FieldOptions.create(options);
        field.classList.add(...field.classList);
        
        field.setAttribute('property', propertyKey);
        return field;
    }

    /**
     * Get Div with id specificFields
     * @return {HTMLElement}
     */
    private get specificFields(): HTMLElement {
        return this.querySelector("#specificFields") as HTMLElement;
    }

}