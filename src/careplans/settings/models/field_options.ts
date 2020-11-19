

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
     * Create a Field with Field-Options
     * @param {FieldOptions} options 
     * @return {HTMLInputElement}
     */
    public static create(options: FieldOptions): HTMLInputElement {
        let element = document.createElement(options.tag) as HTMLInputElement;
        if (options.type != "") {
            element.type = options.type;
        }
        if(options.isTextField) element.classList.add("input");
        return element;
    }


    public static INPUT_NUMBER = new FieldOptions("input", "number");
    public static INPUT_CHECKBOX = new FieldOptions("input", "checkbox");
    public static INPUT_TEXT = new FieldOptions("input", "text");
    public static CUSTOM_CHOICES = new FieldOptions("custom-choices");
}