import {BaseModel} from '@vetprovieh/vetprovieh-shared';

/**
 * A Tenant Request is a request to create a vet-company (tenant)
 */
export class TenantRequest extends BaseModel {
    public name = '';
    public name2 = '';
    public vvvoNumber = '';
}
