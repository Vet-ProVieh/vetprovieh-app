import {WebComponent} from '@tomuench/vetprovieh-shared/lib';
import {FieldWithLabel} from '../../shared';
import {Animal} from '../models';


@WebComponent(
    {
      template: `
        <div class="field">
            <label class="label">\${this.label}</label>
            <div class="control">
                <select class="input" type="\${this.type}">

                </select>
            </div>
        </div>`,
      tag: 'select-animal',
    }
)
/**
 * Select Animal
 */
export class SelectAnimal extends FieldWithLabel {
  /**
   * Default-Contructor
   */
  constructor() {
    super();
    this.label = 'Tierart';
  }


  /**
     * Load HTMl-Input-Field
     * @return {HTMLElement}
     */
  protected get inputField(): HTMLElement {
    return this.getElementsByTagName('select')[0] as HTMLElement;
  }

  /**
   * Rendering
   */
  public render() {
    super.render();

    if (this.inputField) {
      this.renderOptions().forEach((option) => {
        this.inputField.appendChild(option);
      });
    }
  }


  /**
   * Attach selectable Options
   * @return {Array<any>}
   */
  private renderOptions() : Array<any> {
    return Animal.all().map((animal) => {
      const option = document.createElement('option');
      option.value = animal.code;
      option.innerHTML = animal.name;
      return option;
    });
  }
}
