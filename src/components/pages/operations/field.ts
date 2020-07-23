import { VetproviehElement } from "@tomuench/vetprovieh-shared";
import { OperationField } from "../../models/operations/field";

/**
 * Pager OperationField
 */
export class VpOperationField extends VetproviehElement {

    private _field: OperationField = new OperationField();

    public get field(): OperationField {
        return this._field;
    }

    public set field(value: OperationField) {
        if (this._field != value) {
            this._field = value;
        }
    }

    // -----------------
    // CLASS METHODS
    // -----------------

    /**
     * Returning template
     * @return {string}
     */
    static get template(): string {
        return `
            <template>
                <label class="label">{{name}}</label>
                <div class="control">
                    <input property="value" class="input " type="text">
                </div>
            </template>
        `;
    }

    /**
     * Observed attributes
     * @return {Array<string>}
     */
    static get observedAttributes() {
        return ['field'];
    }
}

customElements.define('vp-operation-field', VpOperationField);