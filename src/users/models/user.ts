import { BaseModel } from "@tomuench/vetprovieh-shared/lib/orm/baseModel";
import { Tenant } from "./tentant";

/**
 * User Informations
 */
export class User extends BaseModel {
    public firstName: string = "";
    public lastName: string = "";
    public userName: string = "";
    public email: string = "";
    public tenant: Tenant | undefined;
}