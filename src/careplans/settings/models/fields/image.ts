import {FieldGenerator} from '../../helpers';
import {MediaField} from './mediaField';

/**
 * SettingsField Image
 */
export class ImageField extends MediaField {
  /**
   * Default-Constructor
   */
  constructor() {
    super();
    this.fieldType = 'image';
  }
}


// Registration in FieldGenerator
FieldGenerator.register(new ImageField());
