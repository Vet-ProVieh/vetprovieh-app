import {BaseRepository} from '@vetprovieh/vetprovieh-shared';
import {TenantRequest} from '../models';

/**
 * Tenants Request Repository
 */
export class TenantRequestRepository extends BaseRepository<TenantRequest> {
  /**
   * Default_Constructor
   */
  constructor() {
    super('/service/tenants/requests');
  }
}
