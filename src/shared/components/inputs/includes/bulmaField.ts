import {WebComponent} from '@vetprovieh/vetprovieh-shared';
import {FieldWithLabel} from './fieldWithLabel';


/**
 * Custom Field to Render
 */
// eslint-disable-next-line new-cap
@WebComponent({
  template: `
    <div class="control">
        <div class="field">
            \${this.renderLabel()}
            <div class="control">
                <input class="input" id="input" type="\${this.type}"
                \${this.renderPlaceholder()} \${this.renderRequired()}>
            </div>
        </div>
    </div>`,
  tag: 'bulma-input',
})
/**
 * Simple Bumla-Input-Field
 */
export class BulmaField extends FieldWithLabel {

}
