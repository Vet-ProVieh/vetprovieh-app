import { BasicModel } from "../../shared";
import { Tenant } from "./tentant";

/**
 * User Informations
 */
export class User extends BasicModel {
    public firstName: string = "";
    public lastName: string = "";
    public userName: string = "";
    public email: string = "";
    public tenant: Tenant | undefined;
}