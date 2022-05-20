import {LoadedEvent} from '@tomuench/vetprovieh-detail/lib/loaded-event';
import {WebComponent} from '@tomuench/vetprovieh-shared/lib';
import {PageWithReadOnly} from '../../../components';
import {Careplan} from '../../../models';
import {CareplanGroupRepository} from '../../../repository';

// eslint-disable-next-line new-cap
@WebComponent({
  template: '',
  tag: 'careplan-page',
})
/**
 * CarePlans Show Page
 */
export class CarePlanShowPage extends PageWithReadOnly {
  /**
   * Lifecycle
   * Executed after Data is loaded
   */
  protected afterDataLoaded() {
    super.afterDataLoaded();

    this._setTemplateForGroups();
    this._showGroups(this.currentObject);
    (this.addButton as any)['disabled'] = !(this.currentObject.id);
    this.markAsReadOnly();
    this.addPositionToAddButton();
  }

  /**
   * Add Position Button
   */
  private addPositionToAddButton() {
    const a = this.addButton as HTMLAnchorElement;
    a.href += `&position=${this.maxPosition(this.currentObject.groups)}`;
  }

  /**
     * CurrentView Readonly?
     * @return {boolean}
     */
  protected get readOnly(): boolean {
    return this.detailElement.currentObject.readOnly;
  }


  /**
     * Template für die Gruppen setzen
     */
  private _setTemplateForGroups() {
    this.setTemplateForTable(`
        <tr data-index="{{item.index}}" class="item {{item.active}}">
            <td class="dragable small-td">
                {{item.position}}
            </td>
            <td>
       <a href="groups/show.html?id={{item.id}}${this.readOnlyLinkAttached}" >
                    {{item.name}}
                </a>
                <input type="checkbox" disabled/>
            </td>
            <td class="small-td">
                <button data-action="delete" type="button" 
          class="button is-danger is-small ${this.readOnly ? 'is-hidden' : ''}">
                        Löschen
                </button>
            </td>
        </tr>`, new CareplanGroupRepository());
  }

  /**
     * Showing Groups of a Careplan
     * @param {Careplan} careplan
     * @private
     */
  private _showGroups(careplan: Careplan) {
    if (careplan) {
      const groupRepeater = this.getTable();

      groupRepeater.afterClearAndRender = function() {
        for (let i = 0; i < this.objects.length; i++) {
          const group = this.objects[i];
          if (group.active) {
            const element = groupRepeater.getElementByIndex(i);
            console.log(element);
            const input = element?.querySelector('input');
            if (input) {
              input.checked = true;
            }
          }
        }
      };
      groupRepeater.afterClearAndRender.bind(groupRepeater);
      groupRepeater.objects = careplan.groups;
    }
  }
}
