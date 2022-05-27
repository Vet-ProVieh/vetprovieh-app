import {WebComponent} from '@vetprovieh/vetprovieh-shared';
import {FieldWithLabel} from '../../shared';
import {DrugTreatmentKeysRepository} from '../repository';

// eslint-disable-next-line new-cap
@WebComponent({
  template: `
    <div class="control">
        <div class="field">
            \${this.renderLabel()}
            <div class="control">
                <select id="field" \${this.renderPlaceholder()} class="input">
                \${this.optionsAsHtml}
                </select>
            </div>
        </div>
    </div>`,
  tag: 'treatment-keys-select',
})
/**
 * Treatment Keys Select
 */
export class TreatmentKeysSelect extends FieldWithLabel {
    private repository = new DrugTreatmentKeysRepository();
    public optionsAsHtml = ''

    /**
     * ConnectedCallback
     */
    public connectedCallback() {
      this.renderOptions().then(() => {
        super.connectedCallback();
      }).catch((error) => {
        console.warn(error);
        super.connectedCallback();
      });
    }

    /**
     * Render Options
     * @return {Promise<any>}
     */
    private renderOptions(): Promise<any> {
      return new Promise<any>((resolve, reject) => {
        this.optionsAsHtml = `<option value="">Keine Behandlung</option>`;
        this.repository.keys().then((keys: string[]) => {
          keys.forEach((value: string) => {
            const option = document
                .createElement('option') as HTMLOptionElement;
            option.value = value;
            option.innerHTML = value;
            this.optionsAsHtml += option.outerHTML;
          });
          resolve(true);
        }).catch((error) => {
          console.log('Could not load TreatmentKeys');
          reject(error);
        });
      });
    }


    /**
   * Load HTMl-Input-Field
   * @return {HTMLInputElement}
   */
    protected get inputField(): HTMLSelectElement {
      return this.getElementsByTagName('select')[0] as HTMLSelectElement;
    }
}
