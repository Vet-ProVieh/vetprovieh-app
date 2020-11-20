import { VetproviehBinding, VetproviehElement } from "@tomuench/vetprovieh-shared/lib";

export class FieldWithLabel extends VetproviehElement {

    private _label: string = "";
    private _placeholder: string = "";
    private _type: string = "text";
    private _value: any;
    protected _binding: VetproviehBinding = new VetproviehBinding(this, "value");

    constructor() {
        super(false, false);
    }

    public render() {
        this._binding.clear();
        super.render();
        this._binding.addBinding(this.inputField, "value", "change");
    }


    public connectedCallback() {
        this.render();
    }

    /**
      * Observed Attributes
      */
    static get observedAttributes() {
        return ['value', 'label'];
    }

    /**
     * Load HTMl-Input-Field
     * @return {HTMLInputElement}
     */
    protected get inputField(): HTMLElement {
        return this.getElementsByTagName("input")[0] as HTMLElement;
    }

    /**
     * Render Label to show
     * @return {string}
     */
    protected renderLabel() {
        if (this.label !== "" && this.label) {
            return ` <label class="label">${this.label}</label>`;
        } else {
            return "";
        }
    }


    /**
     * Render Placeholder to Show
     * @return {string}
     */
    protected renderPlaceholder() {
        if (this.placeholder !== "" && this.placeholder) {
            return `placeholder="${this.placeholder}"`;
        } else {
            return "";
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

    /*
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
        if(this._value){
            return this._value;
        } else {
            return "";
        }
    }

    /**
     * Set vlaue
     * @param {any} v
     */
    public set value(v: any) {
        if (this._value !== v) {
            this._value = v;
            this.dispatchEvent(new Event("change"));
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