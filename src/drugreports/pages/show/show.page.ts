import {BasicShowPage} from '../../../shared';
import {WebComponent} from '@tomuench/vetprovieh-shared/lib';
import { BarnsRepository } from '../../../barns/repository';
import { FarmersRepository } from '../../../farmers';
import { VetproviehSelect } from '@tomuench/vetprovieh-select/lib/vetprovieh-select';
import { Drugreport } from '../../models';
import { VetproviehList } from '@tomuench/vetprovieh-list/lib/vetprovieh-list';

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
      let list = this.detailElement.shadowRoot?.querySelector("vetprovieh-list") as VetproviehList
      list.attachData([this.currentObject.drugsTreatments],"",true);
    }

    /**
     * Getting Drugreport
     * @return {Drugreport}
     */
    private get drugreport(): Drugreport {
      return this.detailElement.currentObject as Drugreport;
    }
}
