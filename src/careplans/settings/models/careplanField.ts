import { BasicModel } from "../../../shared";
import { FieldOptions } from "./field_options";

export class CareplanField extends BasicModel {

    name: string = "";
    fieldType: string = "";
    optional: boolean = true;
    position: number = 0;
    voiceInputable: boolean = false;


    static TYPES: any = {
        textArea: {
            "rows": FieldOptions.INPUT_NUMBER,
            "cols": FieldOptions.INPUT_NUMBER
        },
        textFields: {},
        video: {
            "multiple": FieldOptions.INPUT_CHECKBOX
        },
        image: {
            "multiple": FieldOptions.INPUT_CHECKBOX
        },
        list: {
            "choices": {
                tag: "?",
                type: "text"
            },
            "multipleSelect": FieldOptions.INPUT_CHECKBOX
        },
        comboBox: {
            "choices": FieldOptions.CUSTOM_CHOICES,
            "choiceSrc": FieldOptions.INPUT_TEXT,
            "multipleSelect": FieldOptions.INPUT_CHECKBOX
        }
    }
}