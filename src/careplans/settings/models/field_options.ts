import { BulmaField } from "../../../shared";

/**
 * FieldOptions for generating InputFields (Settings::Careplan)
 */
export class FieldOptions {

    public tag: string;
    public type: string;

    constructor(tag: string, type: string = "") {
        this.tag = tag;
        this.type = type;
    }

    /**
     * Is it an Input-Field?
     * @return {boolean}
     */
    public get isInput(): boolean {
        return this.tag === "input";
    }

    /**
     * Css-Classes for Type
     * @return {Array<string>}
     */
    public get classList(): string[] {
        let list: string[] = []

        if (this.isInput) {
            if (this.type !== "checkbox") {
                list.push("input");
            }
        }
        return list;
    }

    /**
     * It is a Text Input?
     * @return {boolean}
     */
    public get isTextField(): boolean {
        return this.tag === "input" && this.type !== "checkbox";
    }

    /**
     * Our own Bulma Input?
     * @return {boolean}
     */
    public get isBulmaInput(): boolean {
        return this.tag.indexOf("bulma") >= 0;
    }

    /**
     * Create a Field with Field-Options
     * @param {FieldOptions} options 
     * @return {HTMLElement}
     */
    public createInputField(propertyKey: string): HTMLElement {
        let element = document.createElement(this.tag) as HTMLElement;
        
        if (this.type != "") element.setAttribute("type", this.type);
        if (this.isTextField) element.classList.add("input");

        element.setAttribute('property', propertyKey);
        element.setAttribute("label", propertyKey);

        if(this.isBulmaInput) (element as BulmaField).render();
        return element;
    }


    public static INPUT_NUMBER = new FieldOptions("bulma-input", "number");
    public static INPUT_CHECKBOX = new FieldOptions("bulma-input-checkbox", "checkbox");
    public static INPUT_TEXT = new FieldOptions("bulma-input", "text");
    public static CUSTOM_CHOICES = new FieldOptions("custom-choices");
}