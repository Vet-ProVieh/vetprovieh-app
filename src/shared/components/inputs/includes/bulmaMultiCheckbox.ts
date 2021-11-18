import { WebComponent } from '@tomuench/vetprovieh-shared/lib';
import { FieldWithLabel } from './fieldWithLabel';

/**
 * Custom Field to Render
 */
@WebComponent({
  template: `
    <div class="control">
        \${this.renderChoices()}
    </div>`,
  tag: 'bulma-multi-checkbox',
})
export class BulmaMultiCheckbox extends FieldWithLabel {
  constructor() {
    super(true, false);
    this.type = 'checkbox';
  }


  private _choices: string[] = [];

  public get choices(): string[] {
    return this._choices;
  }

  public set choices(v: string[]) {
    if (this._choices !== v) {
      this._choices = v;
    }
  }

  public get choicesasstring(): string {
    return this._choices.join(',');
  }

  public set choicesasstring(v: string) {
    const vAsArray = v.split(',');
    this.choices = vAsArray;
  }

  public set value(v: string) {
    if (this.notInChoices(v)) {
      throw new TypeError('Not in Choices');
    }

    super.value = v;
  }

  public get value(): string {
    return super.value;
  }

  public set checked(v: string){
    this.value = v;
  }

  public get checked(): string {
    return this.value;
  }

  /**
   * Check if Value is in current possible choices
   * @param {string} v
   * @return {boolean}
   */
  private notInChoices(v: string): boolean {
    return v.split(',')
      .map((x) => !this.choices.includes(x))
      .reduce((pv, cv) => pv || cv, false);
  }

  public checkValidity(): boolean {
    return this.required ? !!this.value : true;
  }

  public reportValidity(): boolean {
    return this.checkValidity();
  }


  /**
   * Render Choices for UI
   * @return {string}
   */
  public renderChoices(): string {
    return this.choices
      .map((choice) => `<label class="${this.type}">
                    <input name="choice" value="${choice}" type="${this.type}">
                    ${choice}
                </label>`)
      .join('\n');
  }

  /**
   * Passthrough value to inputField
   */
  protected setInputField() {
    this.inputFields.forEach((field) => {
      field.checked = this.value.includes(field.value);
    });
  }

  /**
   * Adding Binding
   */
  protected addBinding() {
    this.inputFields.forEach((field) => {
      field.addEventListener('change', () => {
        this.value = this.inputFields
          .filter((f) => f.checked)
          .map((f) => f.value).join(',');
        this.dispatchEvent(new Event('change'));
      });
    });
  }

  /*
   * Observed Attributes
   */
  static get observedAttributes() {
    return FieldWithLabel.observedAttributes.concat(['choices', 'choicesasstring']);
  }

  /**
   * Get Input-Checkboxes from DOM
   * @return {HTMLInputElement[]}
   */
  private get inputFields(): HTMLInputElement[] {
    return this.choices.map((choice) => {
      const element = this.shadowRoot?.querySelector(
        `input[value="${choice}"]`
      );
      return element as HTMLInputElement;
    });
  }
}
