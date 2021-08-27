import {FieldGenerator} from '../../helpers';
import {FieldOptions} from '../field_options';
import {MediaField} from './mediaField';

export class Video extends MediaField {
  constructor() {
    super();
    this.fieldType = 'video';
  }
}


// Registration in FieldGenerator
FieldGenerator.register(new Video());
