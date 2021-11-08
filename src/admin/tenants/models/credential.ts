import { BaseModel } from "@tomuench/vetprovieh-shared/lib/orm/baseModel";

export class Credential extends BaseModel {
    name: string = "";
    username: string | undefined;
    passwordIsSet: boolean | undefined;
    password: string | undefined;
    enabled: boolean | undefined;
}