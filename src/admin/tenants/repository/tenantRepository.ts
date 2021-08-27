import {BaseRepository} from '@tomuench/vetprovieh-shared/lib';
import {Tenant} from '../models';

/**
 * Repository for tenants
 */
export class TenantRepository extends BaseRepository<Tenant> {
  /**
   * Default_Constructor
   */
  constructor() {
    super('/service/tenantmanagements');
  }
}
