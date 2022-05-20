import {WebComponent} from '@tomuench/vetprovieh-shared/lib';
import {PageWithReadOnly} from '../../components';
import {CareplanGroup} from '../../models/careplanGroup';
import {CareplanFieldRepository} from '../../repository';

// eslint-disable-next-line new-cap
@WebComponent({
  template: '',
  tag: 'careplan-group-page',
})
/**
 * CareplanGroup ShowPage
 */
export class CarePlanGroupShowPage extends PageWithReadOnly {
  /**
     * Lifecycle
     * Executed after Data is loaded
     */
  protected afterDataLoaded() {
    super.afterDataLoaded();
    this._setTemplateForFields();
    this._showGroups(this.detailElement.currentObject as CareplanGroup);

    (this.addButton as any).disabled = !(this.detailElement.currentObject.id);
    this.markAsReadOnly();

    this.setUrlParameter(
        this.currentObject,
        'careplanId',
        'carePlans',
        (i: string) => {
          return {id: parseInt(i)};
        });
    this.setUrlParameter(
        this.currentObject,
        'position',
        'position',
        parseInt);

    this.addPositionToAddButton();
  }

  /**
   * Adding addButton to Position
   */
  private addPositionToAddButton() {
    const aElement = (this.addButton as HTMLAnchorElement);
    aElement.href += `&position=${this.maxPosition(this.currentObject.fields)}`;
  }

  /**
   * Set Template for Fields
   */
  private _setTemplateForFields() {
    this.setTemplateForTable(`
            <tr class="item">
                <td class="dragable small-td">
                    {{item.position}}
                </td>
                <td>
      <a href="../fields/show.html?id={{item.id}}${this.readOnlyLinkAttached}">
                        {{item.name}}
                    </a>
                </td>
                <td class="small-td">
                    <button data-action="delete" type="button" 
          class="button is-danger is-small ${this.readOnly ? 'is-hidden' : ''}">
                            Löschen
                    </button>
                </td>
            </tr>`,
    new CareplanFieldRepository());
  }

  /**
     * Showing Groups of a Careplan
     * @param {CareplanGroup} careplan
     * @private
     */
  private _showGroups(careplan: CareplanGroup) {
    if (careplan) {
      const groupRepeater = this.getTable();
      groupRepeater.objects = careplan.fields;
      groupRepeater.clearAndRender();
    }
  }
}
