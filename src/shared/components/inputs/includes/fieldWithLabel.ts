import {VetproviehBinding, VetproviehElement}
  from '@tomuench/vetprovieh-shared/lib';

/**
 * Bulma Form-Field with Label
 */
export class FieldWithLabel extends VetproviehElement {
    private _label = '';
    private _placeholder = '';
    private _type = 'text';
    private _value: any;
    private _property: string | undefined;
    private _required = false;

    protected _binding: VetproviehBinding;

    /**
     * Default-Constructor
     * @param {boolean} shadowed
     * @param {boolean} render
     */
    constructor(shadowed = false, render = false) {
      super(shadowed, render);
      this._binding = new VetproviehBinding(this, 'value');
    }

    /**
     * Render
     */
    public render() {
      this._binding.clear();
      super.render();
      this.addBinding();
    }

    /**
     * Adding Binding
     */
    protected addBinding() {
      this._binding.addBinding(this.inputField, 'value', 'change');
    }

    /**
     * ConnectedCallback
     */
    public connectedCallback() {
      this.render();
    }

    /**
     * Getter Property
     * @return {string | undefined}
     */
    public get property(): string | undefined {
      return this._property;
    }

    /**
     * Setter Property
     * @param {string | undefined} val
     */
    public set property(val: string | undefined) {
      if (this.property !== val) {
        this._property = val;
      }
    }

    /**
     * Setter Property
     * @param {string | undefined} val
     */
    public set required(val: string | undefined) {
      const valAsBool = val?.toString().toLowerCase() === '';
      if (this._required !== valAsBool) {
        this._required = valAsBool;
      }
    }

    /**
      * Observed Attributes
      */
    static get observedAttributes() {
      return ['value', 'label', 'property', 'type', 'required'];
    }

    /**
     * Load HTMl-Input-Field
     * @return {HTMLInputElement}
     */
    protected get inputField(): HTMLElement {
      return this.getElementsByTagName('input')[0] as HTMLElement;
    }

    /**
     * Render Label to show
     * @return {string}
     */
    protected renderLabel() {
      if (this.label !== '' && this.label) {
        return ` <label class="label">${this.label}</label>`;
      } else {
        return '';
      }
    }

    /**
     * Render required field
     * @return {string}
     */
    protected renderRequired() {
      if (this._required) {
        return ` required`;
      } else {
        return '';
      }
    }

    /**
     * Render Placeholder to Show
     * @return {string}
     */
    protected renderPlaceholder() {
      if (this.placeholder !== '' && this.placeholder) {
        return `placeholder="${this.placeholder}"`;
      } else {
        return '';
      }
    }

    /**
     * Get Placeholder
     * @return {string}
     */
    public get placeholder(): string {
      return this._placeholder;
    }

    /**
     * Set Placeholder
     * @param {string} v
     */
    public set placeholder(v: string) {
      if (v !== this.placeholder) {
        this._placeholder = v;
      }
    }

    /**
     * Get Type
     * @return {string}
     */
    public get type(): string {
      return this._type;
    }

    /**
     * Set Type
     * @param {string} v
     */
    public set type(v: string) {
      if (v !== this._type) {
        this._type = v;
      }
    }

    /**
     * Get value
     * @return {any}
     */
    public get value(): any {
      if (this._value !== null && this._value !== undefined) {
        return this._value;
      } else {
        return '';
      }
    }

    /**
     * Set vlaue
     * @param {any} v
     */
    public set value(v: any) {
      if (this._value !== v) {
        this._value = v;
        this.setInputField();
      }
    }

    /**
     * Passthrough value to inputField
     */
    protected setInputField() {
      const input = (this.inputField as HTMLInputElement);
      if (input && input.value !== this.value) {
        (this.inputField as HTMLInputElement).value = this.value;
      }
    }

    /**
     * Get Label
     * @return {string}
     */
    public get label(): string {
      return this._label;
    }

    /**
     * Set Label
     * @param {string} v
     */
    public set label(v: string) {
      if (v !== this._label) {
        this._label = v;
      }
    }
}
