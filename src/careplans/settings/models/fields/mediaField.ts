import {CareplanField} from '../careplanField';
import {FieldOptions} from '../field_options';


export class MediaField extends CareplanField {
  /**
     * Get FieldParams for creating Fields
     * @return {{[Identifier: string]: FieldOptions}}
     */
  protected get fieldParams() : {[Identifier: string]: FieldOptions} {
    return {
      'multiple': FieldOptions.INPUT_CHECKBOX,
    };
  }
}
