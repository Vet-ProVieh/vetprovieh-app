import { ObjectHelper } from "@tomuench/vetprovieh-shared/lib";
import { BasicModel } from "../../shared";
import { KeyResult, KeyResultMilestones } from "./keyresult";

export class Objective extends BasicModel{
    public name: string = "";
    public date: string = "";
    public position: number = 0;
    public active: boolean = true;
    public welfare: boolean = false;
    public keyResults: KeyResult[] = [new KeyResult()];
    public rating: number = 0;

    /**
     * Resetting Fields to Insert into another Measure
     * @param {Objective} objective 
     */
    public static reset(objective: Objective){
        objective.id = undefined;
        objective.date = ObjectHelper.dateToString(ObjectHelper.addDaysToDate(new Date(),7));
        objective.keyResults.forEach((keyResult) => keyResult.milestones = KeyResultMilestones.Start);
    }
}