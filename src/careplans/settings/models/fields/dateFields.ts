import {FieldGenerator} from '../../helpers';
import {CareplanField} from '../careplanField';

export class DateFields extends CareplanField {
  constructor() {
    super();
    this.fieldType = 'dateFields';
  }
}


// Registration in FieldGenerator
FieldGenerator.register(new DateFields());
