import {WebComponent} from '@tomuench/vetprovieh-shared/lib';
import {FarmersRepository} from '../../repository/farmers_repository';
import {Farmer} from '../../models';
import {BasicIndexPage} from '../../../shared';

// eslint-disable-next-line new-cap
@WebComponent({
  template: '',
  tag: 'vetprovieh-farmers',
})
export class FarmersIndexPage extends BasicIndexPage<Farmer> {
  constructor() {
    super(new FarmersRepository());
  }
}
