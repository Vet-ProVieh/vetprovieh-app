import {WebComponent} from '@tomuench/vetprovieh-shared/lib';
import {BasicIndexPage} from '../../../shared';
import {Drugreport} from '../../models';
import {DrugreportRepository} from '../../repository';

// eslint-disable-next-line new-cap
@WebComponent({
  template: '',
  tag: 'vetprovieh-drugreports',
})
export class DrugsreportsIndexPage extends BasicIndexPage<Drugreport> {
  constructor() {
    super(new DrugreportRepository());
  }
}
