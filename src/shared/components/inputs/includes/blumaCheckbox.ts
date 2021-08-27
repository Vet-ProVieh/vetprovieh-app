import {WebComponent} from '@tomuench/vetprovieh-shared/lib';
import {FieldWithLabel} from './fieldWithLabel';

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
  tag: 'bulma-input-checkbox',
})
export class BulmaCheckbox extends FieldWithLabel {
  constructor() {
    super();
    this.type = 'checkbox';
  }


  public get checked(): any {
    return this.value;
  }

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
