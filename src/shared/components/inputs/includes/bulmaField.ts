import { VetproviehBinding, VetproviehElement, WebComponent } from "@tomuench/vetprovieh-shared/lib";


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
export class BulmaField extends VetproviehElement {

    private _label: string = "";
    private _placeholder: string = "";
    private _type: string = "text";
    private _value: any;
    private _binding: VetproviehBinding = new VetproviehBinding(this, "value");

    constructor() {
        super(false, false);
    }

    public render() {
        this._binding.clear();
        super.render();
        this._binding.addBinding(this.inputField, "value", "change");
    }

    /**
     * Load HTMl-Input-Field
     * @return {HTMLInputElement}
     */
    private get inputField(): HTMLInputElement {
        return this.getElementsByTagName("input")[0] as HTMLInputElement;
    }


    private renderPlaceholder() {
        if (this.placeholder !== "" && this.placeholder) {
            return `placeholder="${this.placeholder}"`;
        } else {
            return ""
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
        return this._value;
    }

    /**
     * Set vlaue
     * @param {any} v
     */
    public set value(v: any) {
        this._value = v;
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