import {WebComponent} from '@tomuench/vetprovieh-shared/lib';
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
export class TreatmentKeysSelect extends FieldWithLabel {
    private repository: DrugTreatmentKeysRepository = new DrugTreatmentKeysRepository();

    public optionsAsHtml = ''


    public connectedCallback() {
      this.renderOptions().then((result) => {
        super.connectedCallback();
      });
    }

    private renderOptions(): Promise<any> {
      return new Promise<any>((resolve, reject) => {
        this.optionsAsHtml = `<option value="">Keine Behandlung</option>`;
        this.repository.keys().then((keys: string[]) => {
          keys.forEach((value: string) => {
            const option = document.createElement('option') as HTMLOptionElement;
            option.value = value;
            option.innerHTML = value;
            this.optionsAsHtml += option.outerHTML;
          });
          resolve(true);
        }).catch((error) => {
          console.log('Could not load TreatmentKeys');
          resolve(false);
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
