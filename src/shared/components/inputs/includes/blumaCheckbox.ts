import { WebComponent } from "@tomuench/vetprovieh-shared/lib";
import { FieldWithLabel } from "./fieldWithLabel";

/**
 * Custom Field to Render 
 */
@WebComponent({
    template: `
    <div class="control">
        <label class="checkbox">
            <input type="\${this.type}">

            \${this.label}
        </label>
    </div>`,
    tag: 'bulma-input-checkbox'
})
export class BulmaCheckbox extends FieldWithLabel {

    constructor() {
        super();
        this.type = "checkbox";
    }

}