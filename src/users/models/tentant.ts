import { Address, BasicModel } from "../../shared";

export class Tenant extends BasicModel{
    public name: string = "";
    public name2: string = "";
    public vvvoNumber: string = "";
    public address: Address = new Address();
}