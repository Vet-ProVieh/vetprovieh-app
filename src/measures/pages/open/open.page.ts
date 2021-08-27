import {VetproviehNavParams, WebComponent} from '@tomuench/vetprovieh-shared/lib';
import {ActionPlan, Measure} from '../../models';
import {MeasuresRepository} from '../../repository/measures_repository';
import {BasicIndexPage} from '../../../shared';
import {MeasuresList} from '../../components';

@WebComponent({
  template: '',
  tag: 'vetprovieh-open-measures',
})
export class MeasuresOpenPage extends BasicIndexPage<Measure> {
  constructor() {
    super(new MeasuresRepository());
  }

  connectedCallback() {
    const list = this.getVetproviehList();
    list.urlSearchParams = {
      barnId: VetproviehNavParams.getUrlParameter('barnId'),
      type: 'open',
    };
    super.connectedCallback();
  }

  /**
     * Load VetproviehList Element from DOM
     * @return {MeasuresList}
     */
  protected getVetproviehList() : MeasuresList {
    return document.getElementsByTagName('measures-list')[0] as MeasuresList;
  }
}
