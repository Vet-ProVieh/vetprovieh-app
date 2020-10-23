

export class FieldOptions {

    public tag: string;
    public type: string;

    constructor(tag: string, type: string = "") {
        this.tag = tag;
        this.type = type;
    }


    /**
     * Create a Field with Field-Options
     * @param {FieldOptions} options 
     * @return {HTMLInputElement}
     */
    public static create(options: FieldOptions) : HTMLInputElement {
        let element = document.createElement(options.tag) as HTMLInputElement;
        if(options.type != "") {
            element.type = options.type;
        }
        return element;
    }


    public static INPUT_NUMBER = new FieldOptions("input", "number");
    public static INPUT_CHECKBOX = new FieldOptions("input","checkbox");
    public static INPUT_TEXT = new FieldOptions("input", "text");
    public static CUSTOM_CHOICES = new FieldOptions("custom-choices");
}