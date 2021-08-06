import { WebComponent, VetproviehElement, VetproviehRepeat } from "@tomuench/vetprovieh-shared/lib";
import { BulmaField } from "./bulmaField";

@WebComponent({
    template: VetproviehElement.template + `
    <style>
     #choices {
         margin-bottom: 20px;
     }
    </style>
    <div class="control">
        <div class="label">\${this.property}</div>
        <div id="choices">
            <p id="noChoicesAvailable">Noch keine Auswahlmöglichkeiten eingefügt</p>
        </div>
        <button id="addElement" class="button" type="button">
            Element hinzufügen
        </button>
    </div>
        `,
    tag: 'custom-choices'
})
export class CustomChoices extends VetproviehElement {

    private _value: string[] = [];
    private _property: string | undefined;
    private _label: string = ""


    constructor() {
        super(true, true);
    }

  /**
     * Callback Implementation
     * @param {string} name
     * @param {any} old
     * @param {any} value
     */
    attributeChangedCallback(name: string, old: any, value: any) {
        super.attributeChangedCallback(name, old, value);
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
      * Observed Attributes
      */
    static get observedAttributes() {
        return ['value', 'property', 'label'];
    }


    /**
     * Get Repeater from Source-Code
     * @return {VetproviehRepeat}
     */
    private get choicesDiv(): HTMLDivElement {
        return this.getByIdFromShadowRoot("choices") as HTMLDivElement;
    }

    /**
     * Announctment-Text for no Choices
     * @return {HTMLParagraphElement}
     */
    private get noChoicesAvailable(): HTMLParagraphElement {
        return this.getByIdFromShadowRoot("noChoicesAvailable") as HTMLParagraphElement;
    }

    /**
     * Show or Hide Announcment
     */
    private hideOrShowNoChoices() {
        if (this.value?.length > 0) {
            if (!this.noChoicesAvailable.classList.contains("is-hidden"))
                this.noChoicesAvailable.classList.add("is-hidden");
        } else {
            this.noChoicesAvailable.classList.remove("is-hidden");
        }
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
    private get valueIsSet(): boolean {
        return this.value && Array.isArray(this.value)
    }

    public render() {
        super.render();
        this.hideOrShowNoChoices();

        if (this.valueIsSet) {
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
        let columns = document.createElement("div");
        columns.id = `ValueAt${index}`
        columns.classList.add("columns");

        let column1 = this.buildColumn();
        column1.appendChild(this.buildInput(index));
        columns.append(column1);

        let column2 = this.buildColumn("is-one-fifth");
        column2.append(this.renderDelete(index));
        columns.append(column2);

        this.choicesDiv.append(columns);
    }

    /**
     * Create new Column
     * @return {HTMLDivElement}
     */
    private buildColumn(size = ""): HTMLDivElement{
        let column = document.createElement("div");
        column.classList.add("column");
        if(size !== "") column.classList.add(size);
        return column;
    }

    /**
     * Render Input-Element
     * @param {number} index 
     * @return {BulmaField}
     */
    private buildInput(index: number) : BulmaField {
        const valueAtPos = this.value[index];
        let newInput = new BulmaField();
        newInput.placeholder = "Bitte Ihren gewünschten Wert eintragen.";
        newInput.value = valueAtPos;
        newInput.addEventListener("change", () => {
            this.value[index] = newInput.value
        });
        return newInput;
    }

    private renderDelete(index: number): HTMLButtonElement {
        let button = document.createElement("button");
        button.classList.add("button","is-danger");
        button.innerHTML = "X";
        button.addEventListener("click", () => this.delete(index));
        return button;
    }

    private delete(index: number) {
        let columns = this.getByIdFromShadowRoot(`ValueAt${index}`);
        columns?.remove();
        this.value.splice(index, 1);
        this.hideOrShowNoChoices();
    }


    /**
     * Attaching Listener to Add-Button
     */
    private attachListenerToAddButton() {
        if (this.addElementButton) {
            this.addElementButton.addEventListener("click", () => {
                this.value.push("");
                this.renderChoice(this.value.length - 1);
                this.hideOrShowNoChoices();
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
