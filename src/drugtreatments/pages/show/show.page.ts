import {BasicShowPage} from '../../../shared';
import {VetproviehNavParams, WebComponent} from '@tomuench/vetprovieh-shared/lib';
import {Drugtreatment} from '../../models';
import { BarnsRepository } from '../../../barns/repository';
import { FarmersRepository } from '../../../farmers';
import { VetproviehSelect } from '@tomuench/vetprovieh-select/lib/vetprovieh-select';
import { Drug } from '../../../drugs';
import { DrugtreatmentRepository } from '../../repository';
import { DrugList } from '../../components';


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

    private rep: DrugtreatmentRepository;
    private barnId: string;
    /**
     * Default-Constructor
     */
    constructor() {
      super();
      this.rep = new DrugtreatmentRepository();
      this.barnId = VetproviehNavParams.getUrlParameter('id');
    }

    /**
     * Callback for Web-Component
     */
    connectedCallback() {
      super.connectedCallback();
    }

    protected afterDataLoaded() {
      this.bindFarmerSelectField();
      this.bindBarnSelectField();
      this.drugs.forEach(drug => {
        this.drugList.appendDrug(drug);
      });
      this.checkIfReported();
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

    private get isReportedField(): HTMLElement {
      return this.detailElement?.getByIdFromShadowRoot("is-reported") as HTMLElement;
    }

    private get reportButton(): HTMLButtonElement {
      return this.detailElement?.getByIdFromShadowRoot("report") as HTMLButtonElement;
    }

    private checkIfReported(){
      if(this.drugtreatment.isReported){
        this.isReportedField.textContent = "ja";
        this.reportButton.disabled = true;
        this.reportButton.addEventListener("click", ()=>{});
      }else{
        this.reportButton.addEventListener("click", ()=>{
          this.rep.report(this.barnId);
        });
      }
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
