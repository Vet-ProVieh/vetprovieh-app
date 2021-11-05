import { VetproviehNavParams, WebComponent } from '@tomuench/vetprovieh-shared/lib';
import { MeasureProactiveRepository } from '../../repository';
import { BasicIndexPage } from '../../../shared';
import { MeasuresList } from '../../components';
import { Measure } from '../../models';

@WebComponent({
  template: '',
  tag: 'vetprovieh-proactive-measures',
})
export class MeasuresProactiveIndexPage extends BasicIndexPage<Measure> {
  constructor() {
    let filter = atob(VetproviehNavParams.getUrlParameter("search"));
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
