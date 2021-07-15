import { Barn } from "../../../barns";
import { BasicModel } from "../../../shared";
import { OperationGroup } from "./group";

export class OperationPlan extends BasicModel{
    public name: string = "";
    public opGroups: OperationGroup[] = [];
    public barn: any;
}