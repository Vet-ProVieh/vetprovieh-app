import {WebComponent} from '@vetprovieh/vetprovieh-shared';
import {BasicIndexPage} from '../../../shared';
import {Drugreport} from '../../models';
import {DrugreportRepository} from '../../repository';

// eslint-disable-next-line new-cap
@WebComponent({
  template: '',
  tag: 'vetprovieh-drugreports',
})
/**
 * DrugReports Index page
 */
export class DrugsreportsIndexPage extends BasicIndexPage<Drugreport> {
  /**
   * Default-Constructor
   */
  constructor() {
    super(new DrugreportRepository());
  }
}
