import {WebComponent} from '@vetprovieh/vetprovieh-shared';
import {BasicIndexPage} from '../../../../shared';
import {TenantRequest} from '../../models';
import {TenantRequestRepository} from '../../repository';

// eslint-disable-next-line new-cap
@WebComponent({
  template: '',
  tag: 'vetprovieh-tenant-requests',
})
/**
 * Tenant-Requests Index Page
 */
export class TenantRequestsIndexPage extends BasicIndexPage<TenantRequest> {
  /**
   * Default_Constructor
   */
  constructor() {
    super(new TenantRequestRepository());
  }
}
