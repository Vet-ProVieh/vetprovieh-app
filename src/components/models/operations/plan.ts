import { BasicModel } from "../basic";
import { OperationGroup } from "./group";

export class OperationPlan extends BasicModel{
    public name: string = "";
    public opGroups: OperationGroup[] = [];
}