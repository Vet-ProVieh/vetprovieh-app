import { WebComponent, VetproviehElement, VetproviehRepeat } from "@tomuench/vetprovieh-shared/lib";
import { BulmaField } from "./bulmaField";

@WebComponent({
    template: VetproviehElement.template + `
    <style>
     #choices {
         margin-bottom: 20px;
     }
    </style>
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
      * Observed Attributes
      */
     static get observedAttributes() {
        return ['value'];
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
            for (let i = 0; i < this.value.length; i++) {
               this.renderChoice(i);
            }
        }
        
        this.attachListenerToAddButton();
    }


    /**
     * Render Choice
     * @param {number} index 
     */
    private renderChoice(index: number) {
        const valueAtPos = this.value[index];
        let newInput = new BulmaField();
        newInput.value = valueAtPos;
        newInput.addEventListener("change",() => this.value[index] = newInput.value );
        newInput.render();
        this.choicesDiv.appendChild(newInput);       
    }
    

    /**
     * Attaching Listener to Add-Button
     */
    private attachListenerToAddButton() {
        if (this.addElementButton) {
            this.addElementButton.addEventListener("click", () => {
                this.value.push("");
                this.renderChoice(this.value.length - 1);
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
        console.log("VALUE");
        console.log(val);
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
