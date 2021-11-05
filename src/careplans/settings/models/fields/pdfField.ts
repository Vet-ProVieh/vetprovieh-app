import {FieldGenerator} from '../../helpers';
import {MediaField} from './mediaField';

/**
 * SettingsField pdfFields
 */
export class PdfField extends MediaField {
  constructor() {
    super();
    this.fieldType = 'pdfFields';
  }
}


// Registration in FieldGenerator
FieldGenerator.register(new PdfField());
