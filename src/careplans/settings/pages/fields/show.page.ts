import { WebComponent, VetproviehTable } from "@tomuench/vetprovieh-shared/lib";
import { LoadedEvent } from "@tomuench/vetprovieh-detail/lib/loaded-event";
import { BasicShowPage } from "../../../../shared";
import { VetproviehDetail } from "../../../../app/main";
import { CareplanGroup } from "../../models/careplanGroup";
import { SelectFieldType } from "../../components";
import { TextArea } from "../../models/fields";

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

            console.log(Object.assign(new TextArea(), this.detailElement.currentObject))

            this.detailElement.currentObject = Object.assign(new TextArea(), this.detailElement.currentObject);

            this.extraFields.attributeChangedCallback("fieldtype", null, this.fieldTypeSelect.value);

            this.detailElement.rebindForm();
        })
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