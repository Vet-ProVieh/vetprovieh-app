import { WebComponent } from '@tomuench/vetprovieh-shared/lib';
import { BasicIndexPage } from '../../../../shared';
import { Credential } from '../../models';
import { CredentialRepository } from '../../repository';


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
