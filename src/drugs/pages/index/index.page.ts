import {WebComponent} from '@vetprovieh/vetprovieh-shared';
import {Drug} from '../../models';
import {BasicIndexPage} from '../../../shared';
import {DrugsRepository} from '../../repository';

// eslint-disable-next-line new-cap
@WebComponent({
  template: '',
  tag: 'vetprovieh-drugs',
})
/**
 * Drugs-Index-Page
 */
export class DrugsIndexPage extends BasicIndexPage<Drug> {
  /**
   * Default-Constructor
   */
  constructor() {
    super(new DrugsRepository());
  }
}
