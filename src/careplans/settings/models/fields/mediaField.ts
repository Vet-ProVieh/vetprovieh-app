import {CareplanField} from '../careplanField';
import {FieldOptions} from '../field_options';

/**
 * Media-Field
 */
export class MediaField extends CareplanField {
  /**
     * Get FieldParams for creating Fields
     * @return {any}
     */
  protected get fieldParams() : {[Identifier: string]: FieldOptions} {
    return {
      'multiple': FieldOptions.INPUT_CHECKBOX,
    };
  }
}
