import {BaseRepository} from '@vetprovieh/vetprovieh-shared';
import {Credential} from '../models';

/**
 * Repository for tenants
 */
export class CredentialRepository extends BaseRepository<Credential> {
  /**
   * Default_Constructor
   */
  constructor() {
    super('/service/tenants/credentials');
  }
}
