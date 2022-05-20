import {FieldGenerator} from '../../helpers';
import {CareplanField} from '../careplanField';

/**
 * Speech-Field
 */
export class SpeechField extends CareplanField {
  /**
   * Default-Constructor
   */
  constructor() {
    super();
    this.fieldType = 'speech';
  }
}


// Registration in FieldGenerator
FieldGenerator.register(new SpeechField());
