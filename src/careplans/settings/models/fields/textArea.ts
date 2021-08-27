import {FieldGenerator} from '../../helpers';
import {CareplanField} from '../careplanField';
import {FieldOptions} from '../field_options';

/**
 * Textarea
 */
export class TextArea extends CareplanField {
    public rows = 1;
    public cols = 20;

    constructor() {
      super();
      this.fieldType = 'textArea';
    }

    /**
     * Get FieldParams for creating Fields
     * @return {{[Identifier: string]: FieldOptions}}
     */
    protected get fieldParams() : {[Identifier: string]: FieldOptions} {
      return {
        'rows': FieldOptions.INPUT_NUMBER,
        'cols': FieldOptions.INPUT_NUMBER,
      };
    }
}


// Registration in FieldGenerator
FieldGenerator.register(new TextArea());
