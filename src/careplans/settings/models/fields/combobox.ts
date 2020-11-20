import { FieldGenerator } from "../../helpers";
import { ChoicesField } from "./choicesField";

export class ComboBox extends ChoicesField{
    
    constructor() {
        super();
        this.fieldType = "comboBox";
    }
}

// Registration in FieldGenerator
FieldGenerator.register(new ComboBox());