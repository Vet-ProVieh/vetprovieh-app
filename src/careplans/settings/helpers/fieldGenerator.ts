import {CareplanField} from '../models/careplanField';

/**
 *
 */
export class FieldGenerator {
  /**
     * Generating Fields
     * @param {string} key
     * @retrun {HTMLElement[]}
     */
  public static generate(key: string): HTMLElement[] {
    if (key) {
      const field = FieldTypesToClass[key];
      if (field) {
        return field.generateAdditionalFields();
      }
    }
    return [];
  }

  /**
     * Is a field registered?
     * @param {string} key
     * @return {boolean}
     */
  public static isRegistered(key: string): boolean {
    const x: any = FieldTypesToClass[key];
    return !!x;
  }

  /**
     * Register a CareplanField for Creation
     * @param {CareplanField} careplanField
     */
  public static register(careplanField: CareplanField) {
    if (careplanField) {
      FieldTypesToClass[careplanField.fieldType] = careplanField;
    }
  }
}


var FieldTypesToClass: { [Identifier: string]: CareplanField } = {};
