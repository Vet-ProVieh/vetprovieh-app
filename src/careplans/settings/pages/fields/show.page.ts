import { WebComponent, Indexable, VetproviehNavParams } from "@tomuench/vetprovieh-shared/lib";
import { PageWithReadOnly, SelectFieldType } from "../../components";
import { CareplanField } from "../../models/careplanField";
import { TextArea, ComboBox, Video, ImageField, List, SpeechField } from "../../models/fields";
import { TextFields } from "../../models/fields/textFields";

@WebComponent({
    template: "",
    tag: "careplan-field-page"
})
export class CarePlanFieldShowPage extends PageWithReadOnly {
    /**
    * Lifecycle
    * Executed after Data is loaded
    */
    protected afterDataLoaded() {
        super.afterDataLoaded();

        this.fieldTypeSelect.value = this.currentObject.fieldType;
        this.attachListener();
        this.extraFields.attributeChangedCallback("fieldtype", null, this.fieldTypeSelect.value);
        this.markAsReadOnly();
        this.fieldTypeSelect.dispatchEvent(new Event("change"));
    }

    /**
     * Setting Params
     */
    private setParams() {
        this.setUrlParameter(this.currentObject, "groupId", "groups", (i: string) => { return { id: parseInt(i) } })
        this.setUrlParameter(this.currentObject, "position", "position", parseInt);
    }

    /**
     * Attach Listener to FieldTypeSelect
     */
    private attachListener() {
        this.fieldTypeSelect.addEventListener("change", (event) => {
            let newField = this.buildField(this.fieldTypeSelect.value);
            this.detailElement.currentObject = newField;
            this.setParams();
            this.extraFields.attributeChangedCallback("fieldtype", null, this.fieldTypeSelect.value);
            this.detailElement.rebindForm();
        })
    }

    /**
     * Building Careplan-Field with the help of its type
     * @param {string} fieldType 
     * @return {CareplanField}
     */
    private buildField(fieldType: string): CareplanField {
        var blankField = this.generateField(fieldType);

        this.hideAdditionalFields(fieldType === "speech");

        let currentObject = this.detailElement.currentObject;
        Object.keys(blankField).forEach((key) => {
            if (key != "fieldType") {
                if (currentObject[key] !== null && currentObject[key] !== undefined) {
                    (blankField as Indexable)[key] = currentObject[key];
                } else {
                    currentObject[key] = (blankField as Indexable)[key];
                }
            }
        });


        return blankField;
    }

    /**
     * Zusatzfelder verstecken
     * @param {boolean} hide 
     */
    private hideAdditionalFields(hide: boolean) {
        let addBox = this.detailElement.getByIdFromShadowRoot("additional");
        if (hide) {
            addBox?.classList.add("is-hidden");
        } else {
            addBox?.classList.remove("is-hidden");
        }
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
                return new Video();
            case "image":
                return new ImageField();
            case "list":
                return new List();
            case "comboBox":
                return new ComboBox();
            case "speech":
                return new SpeechField();
            default:
                return new CareplanField();
        }
    }

    /**
     * Getting WebComponent for Specific Field-Type
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