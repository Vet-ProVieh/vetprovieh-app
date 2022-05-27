import {
  WebComponent,
  VetproviehElement,
  VetproviehNavParams,
} from '@vetprovieh/vetprovieh-shared';
import {
  VetproviehBasicList,
} from '@vetprovieh/vetprovieh-list';
import {OperationPlanBluerprintsRepository} from '../repository';
import {Careplan} from '../../settings';

// eslint-disable-next-line new-cap
@WebComponent({
  template: VetproviehElement.template + `<style>
            :host {
                display: block;
            }
            #listElements div{
                cursor: pointer;
            }
            #listElements div:hover {
                background-color: #F0F0F0 !important;
            }
            </style>

            <!-- SearchControl on Top -->
            <div id="searchControl" class="control">
                <div class="field">
                    <div class="field-body">
                        <textarea id="search"
                        class="input" type="text" is="voice-input"
                                placeholder="Bitte Suchbegriff eingeben">
                        </textarea>
                    </div>
                </div>
            </div>

            <!-- Listing Elements here -->
            <div id="listElements" style="margin-top:20px;">

            </div>
            <!-- Pager for Paging through List-->
            <vetprovieh-pager id="pager" page="1" maximum="7">
            </vetprovieh-pager>`,
  tag: 'select-careplan',
})
/**
 * Select an existing careplan
 */
export class SelectCareplan extends VetproviehBasicList {
  /**
   * Default-Constructor
   */
  constructor() {
    super();

    this.repository = new OperationPlanBluerprintsRepository();
  }

  /**
   * Getter selected animal type
   * @return {string}
   */
  private get selectedAnimalType(): string {
    return VetproviehNavParams.getUrlParameter('animal');
  }

  /**
   * Getter selected barn id
   * @return {string}
   */
  private get selectedBarnId(): string {
    return VetproviehNavParams.getUrlParameter('barn_id');
  }


  /**
    * Attach Data to List
    * @param {Array} data
    * @param {string} searchValue
    * @param {boolean} clear
    */
  attachData(data: any[], searchValue: string, clear = false) {
    super.attachData(this._filterCareplans(data), searchValue, clear);
  }

  /**
     * Filter Careplans after animal-type
     * @param {Array} data
     * @return {Array}
     */
  private _filterCareplans(data: any[]) {
    return data.filter((e: Careplan) => {
      return e.animal === this.selectedAnimalType;
    });
  }


  /**
   * Set list template
   * @param {HTMLTemplateElement} template
   */
  public setlistTemplate(template: HTMLTemplateElement) {
    if (template && this._listTemplate !== template.content) {
      const anchor = template.content
          .querySelector('store-local-link') as HTMLElement;
      if (anchor) {
        const href = anchor.getAttribute('href');
        anchor.setAttribute(
            'href',
            href +
            `?barn_id=${VetproviehNavParams.getUrlParameter('barn_id')}`);
      }
      this._listTemplate = template.content;
    }
  }
}
