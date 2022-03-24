import {WebComponent} from '@tomuench/vetprovieh-shared/lib';
import {Drug} from '../../models';
import {BasicIndexPage} from '../../../shared';
import {DrugsRepository} from '../../repository';

// eslint-disable-next-line new-cap
@WebComponent({
  template: '',
  tag: 'vetprovieh-drugs',
})
export class DrugsIndexPage extends BasicIndexPage<Drug> {
  constructor() {
    super(new DrugsRepository());
  }
}
