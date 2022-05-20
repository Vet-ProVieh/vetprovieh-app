import {FieldGenerator} from '../../helpers';
import {CareplanField} from '../careplanField';

/**
 * Data-Fields
 */
export class DateFields extends CareplanField {
  /**
   * Default-Constructor
   */
  constructor() {
    super();
    this.fieldType = 'dateFields';
  }
}


// Registration in FieldGenerator
FieldGenerator.register(new DateFields());
