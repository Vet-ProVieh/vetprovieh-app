import {
  VetproviehNavParams,
  WebComponent} from '@vetprovieh/vetprovieh-shared';
import {MeasureProactiveRepository} from '../../repository';
import {BasicIndexPage} from '../../../shared';
import {MeasuresList} from '../../components';
import {Measure} from '../../models';

// eslint-disable-next-line new-cap
@WebComponent({
  template: '',
  tag: 'vetprovieh-proactive-measures',
})
/**
 * Measurements proactive
 */
export class MeasuresProactiveIndexPage extends BasicIndexPage<Measure> {
  /**
   * Default-Constructor
   */
  constructor() {
    const filter = atob(VetproviehNavParams.getUrlParameter('search'));
    super(new MeasureProactiveRepository(filter));
  }


  /**
     * Load VetproviehList Element from DOM
     * @return {MeasuresList}
     */
  protected getVetproviehList() : MeasuresList {
    return document.getElementsByTagName('measures-list')[0] as MeasuresList;
  }
}
