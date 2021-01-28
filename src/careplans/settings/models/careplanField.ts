import { BasicModel } from "../../../shared";
import { FieldOptions } from "./field_options";

export class CareplanField extends BasicModel {

    name: string = "";
    fieldType: string = "";
    optional: boolean = true;
    position: number = 0;
    voiceInputable: boolean = false;
    groups: any;
    
    /**
     * Get FieldParams for creating Fields
     * @return {{[Identifier: string]: FieldOptions}}
     */
    protected get fieldParams() : {[Identifier: string]: FieldOptions} {
        return {
        }
    }

    /**
     * Generate Additional Special Fields
     * @return {HTMLElement[]}
     */
    public generateAdditionalFields() : HTMLElement[] {
        let params = this.fieldParams;
        return Object.keys(params).map((propertyKey) => {
            return params[propertyKey].createInputField(propertyKey);
        });
    }
}