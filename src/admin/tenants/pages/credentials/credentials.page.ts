import {WebComponent} from '@vetprovieh/vetprovieh-shared';
import {BasicIndexPage} from '../../../../shared';
import {Credential} from '../../models';
import {CredentialRepository} from '../../repository';

// eslint-disable-next-line new-cap
@WebComponent({
  template: '',
  tag: 'vetprovieh-credentials',
})
/**
 * Index Page for Credentials
 */
export class CredentialsIndexPage extends BasicIndexPage<Credential> {
  /**
   * Default_Constructor
   */
  constructor() {
    super(new CredentialRepository());
  }
}
