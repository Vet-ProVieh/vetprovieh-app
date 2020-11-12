import { ChoicesField } from "./choicesField";

export class ComboBox extends ChoicesField{
    
    constructor() {
        super();
        this.fieldType = "comboBox";
    }
}