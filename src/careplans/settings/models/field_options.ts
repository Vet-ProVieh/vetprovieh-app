

export class FieldOptions {

    public tag: string;
    public type: string;

    constructor(tag: string, type: string) {
        this.tag = tag;
        this.type = type;
    }


    public static create(options: FieldOptions) : HTMLInputElement {
        let element = document.createElement(options.tag) as HTMLInputElement;
        element.type = options.type;
        return element;
    }


    public static INPUT_NUMBER = new FieldOptions("input", "number");
    public static INPUT_CHECKBOX = new FieldOptions("input","checkbox");
}