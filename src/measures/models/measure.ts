import { Barn } from "../../barns";
import { BasicModel } from "../../shared";
import { MeasureGroup } from "./group";
import { Objective } from "./objective";

export class Measure extends BasicModel{
    public animal: string = "";
    public animalNumber: string = "";
    public barnId: number | undefined;
    public barn: Barn | undefined;
    public measureGroups: MeasureGroup[] = [];
    public isBlueprint: boolean = true;
    public measuresDate: string = "";
    public objectives: Objective[] = [];
    public therapyFrequency: string = "";
}