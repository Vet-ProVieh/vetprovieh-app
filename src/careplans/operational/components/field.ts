import { ElementBinding, WebComponent } from "@tomuench/vetprovieh-shared/lib";
import { InputFactory } from "./field/inputFactory";

/**
 * Pager OperationField
 */
@WebComponent({
    template: undefined,
    tag: 'vp-operation-field'
})
export class VpOperationField extends ElementBinding {

    private barnId: string = "";
    constructor(barnId: string){
        super();
        this.barnId = barnId;
    }

    /**
     * Returning template
     * @return {string}
     */
    get template(): string {
        if (this.object) {
            this.object.barnId = this.barnId;
            return super.template + `
            <div class="field is-horizontal" style="margin-top:5px; margin-bottom:5px">
                <div class="field-label">
                    <label class="label">{{name}}</label>
                </div>
                <div class="field-body">
                    <div class="field">` +
                InputFactory.generateField(this.object.fieldType, this.object) + 
                `   </div>
                </div>`;

        } else {
            return '';
        }
    }
}