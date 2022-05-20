import {BasicModel} from '../../../shared';
import {FieldOptions} from './field_options';

/**
 * Careplan Field
 */
export class CareplanField extends BasicModel {
    name = '';
    fieldType = '';
    optional = true;
    position = 0;
    voiceInputable = false;
    validators: any[] = [];
    treatmentKeys = '';
    groups: any;

    /**
     * Get FieldParams for creating Fields
     * @return {any}
     */
    protected get fieldParams() : {[Identifier: string]: FieldOptions} {
      return {
      };
    }

    /**
     * Generate Additional Special Fields
     * @return {HTMLElement[]}
     */
    public generateAdditionalFields() : HTMLElement[] {
      const params = this.fieldParams;
      return Object.keys(params).map((propertyKey) => {
        return params[propertyKey].createInputField(propertyKey);
      });
    }
}
