import {BaseModel} from '@tomuench/vetprovieh-shared/lib/orm/baseModel';
import {Tenant} from './tentant';

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
