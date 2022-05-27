import {BaseModel} from '@vetprovieh/vetprovieh-shared';
import {Tenant} from '../../admin/tenants';

/**
 * User Informations
 */
export class User extends BaseModel {
    public firstName = '';
    public lastName = '';
    public userName = '';
    public email = '';
    public tenant: Tenant | undefined;
}
