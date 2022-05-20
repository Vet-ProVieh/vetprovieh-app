import {FieldGenerator} from '../../helpers';
import {ChoicesField} from './choicesField';

/**
 * List-Model
 */
export class List extends ChoicesField {
  /**
   * Default-Constructor
   */
  constructor() {
    super();
    this.fieldType = 'careplanList';
  }
}


// Registration in FieldGenerator
FieldGenerator.register(new List());
