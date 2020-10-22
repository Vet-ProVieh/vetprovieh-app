import { WebComponent } from "@tomuench/vetprovieh-shared/lib";
import { BasicShowPage } from "../../../../shared";
import { SelectFieldType } from "../../components";
import { CareplanField } from "../../models/careplanField";
import { TextArea } from "../../models/fields";
import { TextFields } from "../../models/fields/textFields";

@WebComponent({
    template: "",
    tag: "careplan-field-page"
})
export class CarePlanFieldShowPage extends BasicShowPage {

    constructor() {
        super();
    }

    connectedCallback() {
        this.detailElement.addEventListener("loadeddata", (event: any) => {
            this.attachListener();
            this.extraFields.attributeChangedCallback("fieldtype", null, this.fieldTypeSelect.value);
        });
    }

    /**
     * Attach Listener to FieldTypeSelect
     */
    private attachListener() {
        this.fieldTypeSelect.addEventListener("change", (event) => {

            var blankField = this.generateField(this.fieldTypeSelect.value);
            this.detailElement.currentObject.fieldType = blankField.fieldType;
            this.detailElement.currentObject = Object.assign(blankField, this.detailElement.currentObject);
            
            this.extraFields.attributeChangedCallback("fieldtype", null, this.fieldTypeSelect.value);

            this.detailElement.rebindForm();
        })
    }



    /**
     * Generating Field 
     * @param {string} type
     * @return {CareplanField}
     */
    private generateField(type: string): CareplanField {
        switch (type) {
            case "textArea":
                return new TextArea();
            case "textFields":
                return new TextFields();
            case "video":
                //return new Video();
            case "image":
                //return new Image();
            case "list":
            case "comboBox":
            default:
                return new CareplanField();
        }
    }

    /**
     * Getting Extra fields Presenter
     * @return {SelectFieldType}
     */
    private get extraFields(): SelectFieldType {
        return this.detailElement.getByIdFromShadowRoot("extraFields") as SelectFieldType;
    }


    /**
     * Getting Select field
     * @return {HTMLSelectElement}
     */
    private get fieldTypeSelect(): HTMLSelectElement {
        return this.detailElement.getByIdFromShadowRoot("fieldType") as HTMLSelectElement;
    }
}