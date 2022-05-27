import {BaseModel} from '@vetprovieh/vetprovieh-shared';
import {Address} from '../../../shared';

/**
 * Model of Tenant
 * a Tenant is a vet-company
 */
export class Tenant extends BaseModel {
    public name = '';
    public name2 = '';
    public vvvoNumber = '';
    public address: Address = new Address();
}
