import {
  VetproviehNavParams,
  WebComponent} from '@tomuench/vetprovieh-shared/lib';
import {BasicIndexPage} from '../../../shared';
import {MeasuresList} from '../../components';
import {Measure} from '../../models';
import {MeasuresRepository} from '../../repository/measures_repository';

// eslint-disable-next-line new-cap
@WebComponent({
  template: '',
  tag: 'vetprovieh-open-measures',
})
/**
 * Open-Measures Page
 */
export class MeasuresOpenPage extends BasicIndexPage<Measure> {
  /**
   * Default-Constructor
   */
  constructor() {
    super(new MeasuresRepository());
  }

  /**
   * Connected-Callback
   */
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
