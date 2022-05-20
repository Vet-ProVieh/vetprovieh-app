import {VetproviehList} from '@tomuench/vetprovieh-list/lib/vetprovieh-list';
import {WebComponent} from '@tomuench/vetprovieh-shared/lib';
import {BasicShowPage} from '../../../shared';
import {Drugreport} from '../../models';

// eslint-disable-next-line new-cap
@WebComponent({
  template: '',
  tag: 'vetprovieh-drugreport',
})
/**
 * Drugreport Show Page
 */
export class DrugreportShowPage extends BasicShowPage {
  /**
     * Default-Constructor
     */
  constructor() {
    super();
  }

  /**
     * Callback for Web-Component
     */
  connectedCallback() {
    super.connectedCallback();
  }

  /**
    * Lifecycle to Override
    * Executed after Data is loaded
    */
  protected afterDataLoaded() {
    const list = this.detailElement
        .shadowRoot?.querySelector('vetprovieh-list') as VetproviehList;
    list.attachData([this.currentObject.drugsTreatments], '', true);
  }

  /**
     * Getting Drugreport
     * @return {Drugreport}
     */
  private get drugreport(): Drugreport {
    return this.detailElement.currentObject as Drugreport;
  }
}
