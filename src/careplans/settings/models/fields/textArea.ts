import { CareplanField } from "../careplanField";

/**
 * Textarea
 */
export class TextArea extends CareplanField {
    public rows: number = 1;
    public cols: number = 20;

    constructor() {
        super();
        this.fieldType = "textArea";
    }
}