import {FieldGenerator} from '../../helpers';
import {CareplanField} from '../careplanField';

export class TextFields extends CareplanField {
  constructor() {
    super();
    this.fieldType = 'textFields';
  }
}


// Registration in FieldGenerator
FieldGenerator.register(new TextFields());
