import {WebComponent} from '@tomuench/vetprovieh-shared/lib';
import {BasicShowPage} from '../../../shared';
import {UserRepository} from '../../repository';

// eslint-disable-next-line new-cap
@WebComponent({
  template: '',
  tag: 'vetprovieh-user',
})
/**
 * Show or Edit User Page
 */
export class UsersShowPage extends BasicShowPage {
    private repository : UserRepository = new UserRepository();

    /**
     * Connected-Callback Implementation (Web-Components)
     */
    connectedCallback() {
      this.detailElement.src = this.repository.endpoint;
    }
}
