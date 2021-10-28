import {BasicShowPage} from '../../../shared';
import {WebComponent} from '@tomuench/vetprovieh-shared/lib';
import {Drugtreatment} from '../../models';
import { BarnsRepository } from '../../../barns/repository';
import { FarmersRepository } from '../../../farmers';
import { VetproviehSelect } from '@tomuench/vetprovieh-select/lib/vetprovieh-select';
import { Drug } from '../../../drugs';
import { DrugList } from '../..';


/**
 * ShowPage
 */
@WebComponent({
  template: '',
  tag: 'vetprovieh-drugtreatment',
})
/**
 * Drugtreatment Show Page
 */
export class DrugtreatmentShowPage extends BasicShowPage {

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

    protected afterDataLoaded() {
      console.log(this.drugtreatment);
      
      this.bindFarmerSelectField();
      this.bindBarnSelectField();
    this.drugs.forEach(drug => {
      this.drugList.appendDrug(drug);
    });
    }

    /**
     * Getting Drugtreatment
     * @return {Drugtreatment}
     */
    private get drugtreatment(): Drugtreatment {
      return this.currentObject as Drugtreatment;
    }

    private get drugs(): Drug[] {
      return this.drugtreatment.drugs;
    }

    private get drugList(): DrugList {
      return this.detailElement?.getByIdFromShadowRoot("drug-list") as DrugList;
    }

    

    /**
     * Binding
     */
     private bindFarmerSelectField() {
      const selectField: VetproviehSelect = this.detailElement.getByIdFromShadowRoot('farmer') as VetproviehSelect;
      if (selectField) {
        selectField.repository = new FarmersRepository();
      }
    }

    /**
     * Binding
     */
     private bindBarnSelectField() {
      const selectField: VetproviehSelect = this.detailElement.getByIdFromShadowRoot('barn') as VetproviehSelect;
      if (selectField) {
        selectField.repository = new BarnsRepository();
      }
    }

}
