import { WebComponent, VetproviehElement, VetproviehRepeat } from "@tomuench/vetprovieh-shared/lib";

@WebComponent({
    template: `
        <vp-repeat id="repeater">
        </vp-repeat>
        <button id="addElement" class="button" type="button">
            Element hinzufügen
        </button>
        `,
    tag: 'custom-choices'
})
export class CustomChoices extends VetproviehElement {

    private _value: string[] = [];


    /**
     * Get Repeater from Source-Code
     * @return {VetproviehRepeat}
     */
    private get repeater(): VetproviehRepeat {
        return this.getByIdFromShadowRoot("repeater") as VetproviehRepeat;
    }

    /**
     * Load the ElementButton
     * @return {HTMLButtonElement}
     */
    private get addElementButton(): HTMLButtonElement {
        return this.getByIdFromShadowRoot("addElement") as HTMLButtonElement;
    }

    constructor() {
        super(true, true);
        this.fieldTemplate = this.buildDefaultTemplate();
    }

    /**
     * Generating Default-Template to set
     * @return {DocumentFragment}
     */
    private buildDefaultTemplate(): DocumentFragment {
        let e: HTMLTemplateElement = document.createElement("template");
        e.innerHTML = DEFAULT_TEMPLATE;
        return e.content;
    }

    public render() {
        super.render();
        if(this.value && Array.isArray(this.value))
            this.repeater.objects = this.value;
        
        this.attachListenerToAddButton();
    }

    private attachListenerToAddButton() {
        if (this.addElementButton) {
            this.addElementButton.addEventListener("click", () => {
                console.log("hello");
                this.value.push("Hello");
                this.render();
            })
        }
    }

    /**
     * Setting FieldTemplate
     * @param {DocumentFragment} val
     */
    set fieldTemplate(val: DocumentFragment) {
        this.repeater.listTemplate = val;
    }

    /**
     * Get Value
     * @return {string[]}
     */
    get value(): string[] {
        return this._value;
    }

    /**
     * Set Value
     * @param {string[]} val
     */
    set value(val: string[]) {
        if (val !== this._value) {
            if (Array.isArray(val)) {
                this._value = val;
            } else {
                this._value = [];
            }
            this.render();
        }
    }

}


var DEFAULT_TEMPLATE =
    `<div class="field">
    <div class="control">
        <input class="input" type="text" placeholder="Bitte Wert eingeben">
    </div>
 </div>`;