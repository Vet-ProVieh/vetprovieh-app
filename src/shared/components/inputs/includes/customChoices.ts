import { WebComponent, VetproviehElement } from "@tomuench/vetprovieh-shared/lib";

@WebComponent({
    template: `
        <div id="list>
        </div>
        <button class="button" type="button">
            Element hinzufügen
        </button>
        `,
    tag: 'custom-choices'
})
export class CustomChoices extends VetproviehElement {

    private _value: string[] = []; 
    
    private _fieldTemplate: string = DEFAULT_TEMPLATE;

    constructor() {
        super(false, false);
    }

    /**
     * Setting FieldTemplate
     * @param {string} val
     */
    set fieldTemplate(val: string) {
        if(val !== this._fieldTemplate){
            this._fieldTemplate = val;
        }
    }

    /**
     * Get Value
     * @return {string[]}
     */
    get value() : string[] {
        return this._value;
    }

    /**
     * Set Value
     * @param {string[]} val
     */
    set value(val: string[]){
        if(val !== this._value){
            this._value = val;
        }
    }

}


var DEFAULT_TEMPLATE = 
`<div class="field">
    <div class="control">
        <input class="input" type="text" placeholder="Bitte Wert eingeben">
    </div>
 </div>`;