import {WebComponent} from '@tomuench/vetprovieh-shared/lib';
import {BasicIndexPage} from '../../../shared';
import {User} from '../../models';
import {UserRepository} from '../../repository';

// eslint-disable-next-line new-cap
@WebComponent({
  template: '',
  tag: 'vetprovieh-users',
})
/**
 * List Users
 */
export class UsersIndexPage extends BasicIndexPage<User> {
  /**
   * Default-Constructor
   */
  constructor() {
    super(new UserRepository());
  }
}
