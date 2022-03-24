import {WebComponent} from '@tomuench/vetprovieh-shared/lib';
import {BasicIndexPage} from '../../../../shared';
import {Tenant} from '../../models';
import {TenantRepository} from '../../repository';

// eslint-disable-next-line new-cap
@WebComponent({
  template: '',
  tag: 'vetprovieh-tenants',
})
/**
 * Index Page for Tenants
 */
export class TenantsIndexPage extends BasicIndexPage<Tenant> {
  /**
   * Default_Constructor
   */
  constructor() {
    super(new TenantRepository());
  }
}
