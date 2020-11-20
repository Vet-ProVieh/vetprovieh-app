import { FieldGenerator } from "../../helpers";
import { ChoicesField } from "./choicesField";

export class List extends ChoicesField{
    
    constructor() {
        super();
        this.fieldType = "careplanList";
    }
}


// Registration in FieldGenerator
FieldGenerator.register(new List());