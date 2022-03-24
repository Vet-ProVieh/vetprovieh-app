import {VetproviehNavParams, WebComponent} from '@tomuench/vetprovieh-shared/lib';
import {BarnsRepository} from '../../repository';
import {Barn} from '../../models';
import {BasicIndexPage} from '../../../shared';

// eslint-disable-next-line new-cap
@WebComponent({
  template: '',
  tag: 'vetprovieh-barns',
})
/**
 * Barn Index Page
 */
export class BarnsIndexPage extends BasicIndexPage<Barn> {
  /**
   * Default-Constructor
   */
  constructor() {
    super(new BarnsRepository());
  }

  /**
   * Connected-Callback for Web-Component
   */
  connectedCallback() {
    super.connectedCallback();

    const farmerId = VetproviehNavParams.getUrlParameter('farmerId');
    if (farmerId) {
      this.searchByParams({'farmer.id': farmerId});
    }
  }
}
