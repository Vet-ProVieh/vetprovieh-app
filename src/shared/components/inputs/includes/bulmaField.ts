import { WebComponent } from "@tomuench/vetprovieh-shared/lib";
import { FieldWithLabel } from "./fieldWithLabel";


/**
 * Custom Field to Render 
 */
@WebComponent({
    template: `
    <div class="control">
        <div class="field">
            \${this.renderLabel()}
            <div class="control">
                <input class="input" type="\${this.type}" \${this.renderPlaceholder()}>
            </div>
        </div>
    </div>`,
    tag: 'bulma-input'
})
export class BulmaField  extends FieldWithLabel{

}