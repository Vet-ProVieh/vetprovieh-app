import { BasicModel } from "../../shared";
import { KeyResult } from "./keyresult";

export class Objective extends BasicModel{
    public name: string = "Stallluft verbessern";
    public date: string = "";
    public position: number = 0;
    public active: boolean = true;
    public keyResults: KeyResult[] = [];
}