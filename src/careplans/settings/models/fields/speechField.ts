import {FieldGenerator} from '../../helpers';
import {CareplanField} from '../careplanField';

export class SpeechField extends CareplanField {
  constructor() {
    super();
    this.fieldType = 'speech';
  }
}


// Registration in FieldGenerator
FieldGenerator.register(new SpeechField());
