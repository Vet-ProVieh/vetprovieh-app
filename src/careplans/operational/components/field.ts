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
    /**
     * Returning template
     * @return {string}
     */
    get template(): string {
        if (this.object) {
            return super.template + `
                <label class="label">{{name}}</label>` +
                InputFactory.generateField(this.object.fieldType, this.object);

        } else {
            return '';
        }
    }
}