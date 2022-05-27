import {BaseRepository} from '@vetprovieh/vetprovieh-shared';
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
