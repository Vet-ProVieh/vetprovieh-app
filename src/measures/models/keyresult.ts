import { BasicModel } from "../../shared";

export class KeyResult extends BasicModel {
    public active: boolean = true;
    public milestones: KeyResultMilestones = KeyResultMilestones.Start;
    public name: string = "";
    public position: number = 1;
    public value: number = 0;

}

export enum KeyResultMilestones {
    Current,
    Target,
    Start
}