import {VetproviehElement, WebComponent} from '@tomuench/vetprovieh-shared/lib';
import {FieldGenerator} from '../helpers';

// eslint-disable-next-line new-cap
@WebComponent({
  template: VetproviehElement.template + `

    <div id="specificFields">

    </div>
    `,
  tag: 'select-field-type',
})
/**
 * Select a FieldType
 */
export class SelectFieldType extends VetproviehElement {
    private _fieldType: string | undefined;


    /**
      * Observed Attributes
      */
    static get observedAttributes() {
      return ['fieldtype'];
    }

    constructor() {
      super(false, false);
      this.render();
    }


    /**
     * Getter Fieldtype
     * @return {string}
     */
    public get fieldtype(): string {
      return this._fieldType || '';
    }

    /**
     * Setter FieldType
     * @param {string} val
     */
    public set fieldtype(val: string) {
      if (val !== this._fieldType) {
        this._fieldType = val;
      }
    }

    public render() {
      super.render();
      this.createAndAttachFields(this.fieldtype);
    }

    /**
     * Creating fields for a CareplanFieldType
     * @param {string} fieldType
     */
    private createAndAttachFields(fieldType: string) {
      if (this.fieldtype) {
        FieldGenerator.generate(fieldType).forEach((field: HTMLElement) => {
          this.specificFields.append(field);
        });
      }
    }

    /**
     * Get Div with id specificFields
     * @return {HTMLElement}
     */
    private get specificFields(): HTMLElement {
      return this.querySelector('#specificFields') as HTMLElement;
    }
}
