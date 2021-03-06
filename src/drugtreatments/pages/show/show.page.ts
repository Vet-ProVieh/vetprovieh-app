import {
  VetproviehSelect,
} from '@vetprovieh/vetprovieh-select';
import {
  VetproviehNavParams,
  WebComponent,
} from '@vetprovieh/vetprovieh-shared';
import * as bulmaToast from 'bulma-toast';
import {BarnsRepository} from '../../../barns/repository';
import {DrugreportRepository} from '../../../drugreports';
import {Drug} from '../../../drugs';
import {FarmersRepository} from '../../../farmers';
import {BasicShowPage} from '../../../shared';
import {Drugtreatment} from '../../models';
import {DrugtreatmentRepository} from '../../repository';

// eslint-disable-next-line new-cap
@WebComponent({
  template: '',
  tag: 'vetprovieh-drugtreatment',
})
/**
 * Drugtreatment Show Page
 */
export class DrugtreatmentShowPage extends BasicShowPage {
    private rep: DrugtreatmentRepository;
    private drugReportRep: DrugreportRepository;
    private barnId: string;
    /**
     * Default-Constructor
     */
    constructor() {
      super();
      this.rep = new DrugtreatmentRepository();
      this.drugReportRep = new DrugreportRepository();
      this.barnId = VetproviehNavParams.getUrlParameter('id');
    }

    /**
     * Callback for Web-Component
     */
    connectedCallback() {
      super.connectedCallback();
    }

    /**
     * afterDataLoadCallback
     */
    protected afterDataLoaded() {
      this.bindFarmerSelectField();
      this.bindBarnSelectField();
      this.checkIfReported();
    }

    /**
     * Getting Drugtreatment
     * @return {Drugtreatment}
     */
    private get drugtreatment(): Drugtreatment {
      return this.currentObject as Drugtreatment;
    }

    /**
     * Getter drugs
     * @return {Drug[]}
     */
    private get drugs(): Drug[] {
      return this.drugtreatment.drugs;
    }

    /**
     * Getter ReportField
     * @return {HTMLElement}
     */
    private get isReportedField(): HTMLElement {
      return this
          .detailElement?.getByIdFromShadowRoot('is-reported') as HTMLElement;
    }

    /**
     * Report-Button
     */
    private get reportButton(): HTMLButtonElement {
      return this
          .detailElement?.getByIdFromShadowRoot('report') as HTMLButtonElement;
    }

    /**
     * Check if drugtreatment is already reported
     *  if not add event listener to report button
     */
    private checkIfReported() {
      if (this.drugtreatment.isReported) {
        this.isReportedField.textContent = 'ja';
        this.reportButton.disabled = true;
      } else {
        this.reportButton.addEventListener('click', ()=>{
          this.drugReportRep.report(this.barnId).then(() => {
            bulmaToast.toast({
              message: 'Melden erfolgreich!',
              type: 'is-success',
            });
            this.reportButton.disabled = true;
          }).catch((ex) => {
            console.warn(ex);
            bulmaToast.toast({
              message: 'Melden fehlgeschlagen',
              type: 'is-danger',
            });
          });
        });
      }
    }

    /**
     * Binding
     */
    private bindFarmerSelectField() {
      const selectField: VetproviehSelect = this.detailElement
          .getByIdFromShadowRoot('farmer') as VetproviehSelect;
      if (selectField) {
        selectField.repository = new FarmersRepository();
      }
    }

    /**
     * Binding
     */
    private bindBarnSelectField() {
      const selectField: VetproviehSelect = this.detailElement
          .getByIdFromShadowRoot('barn') as VetproviehSelect;
      if (selectField) {
        selectField.repository = new BarnsRepository();
      }
    }
}
