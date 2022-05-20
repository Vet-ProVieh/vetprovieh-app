import {FieldGenerator} from '../../helpers';
import {MediaField} from './mediaField';

/**
 * Video Model
 */
export class Video extends MediaField {
  /**
   * Default-Constructor
   */
  constructor() {
    super();
    this.fieldType = 'video';
  }
}


// Registration in FieldGenerator
FieldGenerator.register(new Video());
