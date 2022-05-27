import {
  Indexable,
  ViewHelper,
  WebComponent} from '@vetprovieh/vetprovieh-shared';
import {PageWithReadOnly, SelectFieldType} from '../../components';
import {CareplanField} from '../../models/careplanField';
import {
  ComboBox,
  ImageField,
  List,
  SpeechField,
  TextArea,
  Video} from '../../models/fields';
import {TextFields} from '../../models/fields/textFields';

// eslint-disable-next-line new-cap
@WebComponent({
  template: '',
  tag: 'careplan-field-page',
})
/**
 * Careplan Fields show Page
 */
export class CarePlanFieldShowPage extends PageWithReadOnly {
  /**
    * Lifecycle
    * Executed after Data is loaded
    */
  protected afterDataLoaded() {
    super.afterDataLoaded();

    this.fieldTypeSelect.value = this.currentObject.fieldType;
    this.attachListener();
    this.extraFields.attributeChangedCallback(
        'fieldtype',
        null,
        this.fieldTypeSelect.value);
    this.markAsReadOnly();
    this.fieldTypeSelect.dispatchEvent(new Event('change'));
  }

  /**
     * Setting Params
     */
  private setParams() {
    this.setUrlParameter(
        this.currentObject,
        'groupId',
        'groups',
        (i: string) => {
          return {id: parseInt(i)};
        });
    this.setUrlParameter(this.currentObject, 'position', 'position', parseInt);
  }

  /**
     * Attach Listener to FieldTypeSelect
     */
  private attachListener() {
    this.fieldTypeSelect.addEventListener('change', () => {
      const newField = this.buildField(this.fieldTypeSelect.value);
      this.detailElement.currentObject = newField;
      this.setParams();
      this.extraFields.attributeChangedCallback(
          'fieldtype',
          null,
          this.fieldTypeSelect.value);
      this.detailElement.rebindForm();
    });
  }

  /**
     * Building Careplan-Field with the help of its type
     * @param {string} fieldType
     * @return {CareplanField}
     */
  private buildField(fieldType: string): CareplanField {
    const blankField = this.generateField(fieldType);

    this.hideAdditionalFields(fieldType === 'speech');

    const currentObject = this.detailElement.currentObject;
    Object.keys(blankField).forEach((key) => {
      if (key != 'fieldType') {
        if (currentObject[key] !== null && currentObject[key] !== undefined) {
          (blankField as Indexable)[key] = currentObject[key];
        } else {
          currentObject[key] = (blankField as Indexable)[key];
        }
      }
    });


    return blankField;
  }

  /**
     * Zusatzfelder verstecken
     * @param {boolean} hide
     */
  private hideAdditionalFields(hide: boolean) {
    const addBox = this.detailElement.getByIdFromShadowRoot('additional');
    if (addBox) ViewHelper.toggleVisibility(addBox, !hide);
  }

  /**
     * Generating Field
     * @param {string} type
     * @return {CareplanField}
     */
  private generateField(type: string): CareplanField {
    switch (type) {
      case 'textArea':
        return new TextArea();
      case 'textFields':
        return new TextFields();
      case 'video':
        return new Video();
      case 'image':
        return new ImageField();
      case 'careplanList':
        return new List();
      case 'comboBox':
        return new ComboBox();
      case 'speech':
        return new SpeechField();
      default:
        return new CareplanField();
    }
  }

  /**
     * Getting WebComponent for Specific Field-Type
     * @return {SelectFieldType}
     */
  private get extraFields(): SelectFieldType {
    return this.detailElement
        .getByIdFromShadowRoot('extraFields') as SelectFieldType;
  }

  /**
     * Getting Select field
     * @return {HTMLSelectElement}
     */
  private get fieldTypeSelect(): HTMLSelectElement {
    return this.detailElement
        .getByIdFromShadowRoot('fieldType') as HTMLSelectElement;
  }
}
