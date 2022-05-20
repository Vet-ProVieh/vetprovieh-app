import {CareplanField} from '../models/careplanField';

/**
 * Field Generator
 */
export class FieldGenerator {
  /**
     * Generating Fields
     * @param {string} key
     * @return {HTMLElement[]}
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


const FieldTypesToClass: { [Identifier: string]: CareplanField } = {};
