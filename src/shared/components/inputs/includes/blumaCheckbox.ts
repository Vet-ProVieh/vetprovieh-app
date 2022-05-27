import {WebComponent} from '@vetprovieh/vetprovieh-shared';
import {FieldWithLabel} from './fieldWithLabel';


// eslint-disable-next-line new-cap
@WebComponent({
  template: `
    <div class="control">
        <label class="checkbox">
            <input type="\${this.type}">

            \${this.label}
        </label>
    </div>`,
  tag: 'bulma-input-checkbox',
})
/**
 * Bluma Checkbox-Field
 */
export class BulmaCheckbox extends FieldWithLabel {
  /**
   * Default_Constructor
   */
  constructor() {
    super();
    this.type = 'checkbox';
  }

  /**
 * Getter checked
 * @return {any}
 */
  public get checked(): any {
    return this.value;
  }

  /**
 * Setter checked
 * @param {any} val
 */
  public set checked(val: any) {
    this.value = val;
  }

  /**
     * Passthrough value to inputField
     */
  protected setInputField() {
    const input = (this.inputField as HTMLInputElement);
    if (input && input.checked !== this.value) {
      input.checked = this.value;
    }
  }

  /**
     * Adding Binding
     */
  protected addBinding() {
    this._binding.addBinding(this.inputField, 'checked', 'change');
  }
}
