import { WebComponent, VetproviehElement, VetproviehRepeat } from "@tomuench/vetprovieh-shared/lib";
import { BulmaField } from "./bulmaField";

@WebComponent({
    template: `
        <div id="choices">
        </div>
        <button id="addElement" class="button" type="button">
            Element hinzufügen
        </button>
        `,
    tag: 'custom-choices'
})
export class CustomChoices extends VetproviehElement {

    private _value: string[] = [];


    constructor() {
        super(true, true);
    }

    /**
     * Get Repeater from Source-Code
     * @return {VetproviehRepeat}
     */
    private get choicesDiv(): HTMLDivElement {
        return this.getByIdFromShadowRoot("choices") as HTMLDivElement;
    }

    /**
     * Load the ElementButton
     * @return {HTMLButtonElement}
     */
    private get addElementButton(): HTMLButtonElement {
        return this.getByIdFromShadowRoot("addElement") as HTMLButtonElement;
    }

    /**
     * Value is correctly set?
     * @return {boolean}
     */
    private get valueIsSet() : boolean {
        return this.value && Array.isArray(this.value)
    }

    public render() {
        super.render();

        if(this.valueIsSet){
            this.value.forEach((value) => {
                let newInput = new BulmaField();
                newInput.value = value;
                newInput.render();
                this.choicesDiv.appendChild(newInput);
            })
        }
        
        this.attachListenerToAddButton();
    }

    /**
     * Attaching Listener to Add-Button
     */
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
