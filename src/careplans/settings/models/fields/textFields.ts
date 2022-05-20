import {FieldGenerator} from '../../helpers';
import {CareplanField} from '../careplanField';

/**
 * Text-Fields
 */
export class TextFields extends CareplanField {
  /**
   * Default-Constructor
   */
  constructor() {
    super();
    this.fieldType = 'textFields';
  }
}


// Registration in FieldGenerator
FieldGenerator.register(new TextFields());
