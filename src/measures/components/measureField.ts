import {
  BaseRepository,
  ElementBinding,
  ViewHelper,
  WebComponent,
} from '@vetprovieh/vetprovieh-shared';
import {VetproviehSelect} from '../../app/main';
import {
  InputFactory,
} from '../../careplans/operational/components/field/inputFactory';
import {MeasureField} from '../models';


// eslint-disable-next-line new-cap
@WebComponent({
  template: undefined,
  tag: 'vp-measure-field',
})
/**
 * MeasureField Display-Component
 */
export class MeasureFieldComponent extends ElementBinding {
    private _linkedField: MeasureFieldComponent | undefined;
    private _isValid = false;

    /**
     * Getting Linked Element to this Field
     * @return {MeasureFieldComponent | undefined}
     */
    public get linkedField(): MeasureFieldComponent | undefined {
      return this._linkedField;
    }


    /**
     * Link Field to another
     * @param {MeasureFieldComponent | undefined } field
     */
    public linkToField(field: MeasureFieldComponent | undefined ) {
      if (field) {
        this._linkedField = field;
        this.evaluteLinkedValue(field.object.value);

        field.addEventListener('change', (event) => {
          const e = event as CustomEvent;
          this.evaluteLinkedValue(e?.detail);
        });
      }
    }


    /**
     * Evaluate required and visiblity in dependency of the linked value
     * @param {any} value
     */
    private evaluteLinkedValue(value: any) {
      const obj = this.object as MeasureField;
      const shouldShow = this.compareLinkedPos(
            obj.link_position?.value, value,
            obj.link_position?.compare);

      ViewHelper.toggleVisibility(this, shouldShow);
      ViewHelper.toggleRequirement(this, shouldShow);
      if (this.inputField) {
        this.inputField.required = shouldShow;
        obj.optional = !shouldShow;
      }
    }

    /**
     * Compares two Linked Positions
     * @param {any} value1
     * @param {any} value2
     * @param {string} operator
     * @return {boolean}
     */
    private compareLinkedPos(
        value1: any,
        value2: any,
        operator = '=='): boolean {
      switch (operator) {
        case '==':
          return value1===value2;
        case '!=':
          return value1 !==value2;
        default:
          return value1===value2;
      }
    }

    /**
     * is MeasureField valid
     * @return {Boolean}
     */
    get isValid(): boolean {
      return this._isValid;
    }


    /**
     * Getting Repository for element
     * @param {string} src
     * @return {BaseRepository | undefined}
     */
    private getChoiceRepository(src: string): BaseRepository<any> | undefined {
      console.log(src);
      return undefined;
    }

    /**
    * Callback to Overwrite
    * @protected
    */
    protected _afterRender() {
      if (this.object.choiceSrc) {
        const vetproviehSelect = this
            .querySelector('vetprovieh-select') as VetproviehSelect;
        if (vetproviehSelect) {
          const repository = this.getChoiceRepository(this.object.choiceSrc);
          if (repository) vetproviehSelect.repository = repository;
        }
      }

      this.addValidListener();
    }

    /**
     * Adding Event Listener for Validity to trace changes
     */
    private addValidListener() {
      const input = this.inputField;
      if (input) {
        input.addEventListener('change', (event) => {
          this.dispatchEvent(
              new CustomEvent(
                  'change',
                  {detail: (event.target as any).value})
          );
          this._isValid = input.checkValidity();
        });
        this._isValid = input.checkValidity();
      }
    }

    /**
     * Load InputField
     * @return {HTMLInputElement}
     */
    private get inputField(): HTMLInputElement {
      return this.querySelector('[property=\'value\']') as HTMLInputElement;
    }

    /**
     * Attaching Value from Takeover
     * @param {any} value
     */
    public attachValue(value: any) {
      if (this.object.detailsType==='textArea') {
        const inputfield = this
            .querySelector('textarea') as HTMLTextAreaElement;
        if (inputfield) {
          inputfield.value += `${value}\r\n`;
        }
      }
    }

    /**
     * Returning template
     * @return {string}
     */
    get template(): string {
      if (this.object) {
        return super.template + `
            <div class="field is-horizontal" 
                 style="margin-top:5px; margin-bottom:5px">
                <div class="field-label">
                    <label class="label">{{name}}</label>
                </div>
                <div class="field-body">
                    <div class="field">` +
         InputFactory.generateField(this.object.detailsType, this.object) +
                `   </div>
                </div>
            </div>
            <hr/>`;
      } else {
        return '';
      }
    }
}
