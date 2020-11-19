import { WebComponent } from "@tomuench/vetprovieh-shared/lib";
import { FieldWithLabel } from "./fieldWithLabel";


/**
 * Custom Field to Render 
 */
@WebComponent({
    template: `
    <div class="field">
        <label class="label">\${this.label}</label>
        <div class="control">
            <input class="input" type="\${this.type}" \${this.renderPlaceholder()}>
        </div>
    </div>`,
    tag: 'bulma-input'
})
export class BulmaField  extends FieldWithLabel{

}