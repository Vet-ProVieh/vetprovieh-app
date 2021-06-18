import { Barn } from "../../barns";
import { BasicModel } from "../../shared";

export class Measure extends BasicModel{
    public animal: string = "";
    public animalNumber: string = "";
    public barnId: number | undefined;
    /*public measureData: xxx;*/
    public isBlueprint: boolean = true;
    public measuresDate: string = "";
    /*public objectives: xxx;*/
    public therapyFreqency: string = "";
}