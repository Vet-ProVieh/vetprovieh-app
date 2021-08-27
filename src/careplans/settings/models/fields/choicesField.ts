import {FieldGenerator} from '../../helpers';
import {CareplanField} from '../careplanField';
import {FieldOptions} from '../field_options';

/**
 * Field to choose between values
 */
export class ChoicesField extends CareplanField {
    public choices: string[] = []
    public choiceSrc = '';
    public multipleSelect = false;

    /**
     * Get Possible Choice-Sources to select
     * @return {string[]}
     */
    public static get choiceSrcs() {
      return CHOICE_SRCS;
    }


    /**
     * Get FieldParams for creating Fields
     * @return {{[Identifier: string]: FieldOptions}}
     */
    protected get fieldParams() : {[Identifier: string]: FieldOptions} {
      return {
        'choices': FieldOptions.CUSTOM_CHOICES,
        'choiceSrc': FieldOptions.INPUT_TEXT,
        'multipleSelect': FieldOptions.INPUT_CHECKBOX,
      };
    }
}


var CHOICE_SRCS = [
  'MEDS',
  'XXXX',
];
