import {BaseModel} from '@tomuench/vetprovieh-shared/lib/orm/baseModel';

/**
 * Credential-Model
 */
export class Credential extends BaseModel {
    name = '';
    username: string | undefined;
    passwordIsSet: boolean | undefined;
    password: string | undefined;
    enabled: boolean | undefined;
}
