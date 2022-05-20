import {FieldGenerator} from '../../helpers';
import {ChoicesField} from './choicesField';

/**
 * ComboBox
 */
export class ComboBox extends ChoicesField {
  /**
   * Default-Constructor
   */
  constructor() {
    super();
    this.fieldType = 'comboBox';
  }
}

// Registration in FieldGenerator
FieldGenerator.register(new ComboBox());
