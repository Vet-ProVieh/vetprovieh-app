import { BasicModel } from "../../shared";

export class ActionPlan extends BasicModel{
    public name: string = "";
    public actionId: number | undefined;
    public desc: string = "";
}