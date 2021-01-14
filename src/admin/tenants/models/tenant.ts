import { BaseModel } from "@tomuench/vetprovieh-shared/lib/orm/baseModel";
import { Address } from "../../../shared";

export class Tenant extends BaseModel{
    public name: string = "";
    public name2: string = "";
    public vvvoNumber: string = "";
    public address: Address = new Address();
}