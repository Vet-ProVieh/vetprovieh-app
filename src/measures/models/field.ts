import { BasicModel } from "../../shared";

export class MeasureField extends BasicModel {
    public name: string = "";
    public value: any;
    public position: number = 0;
    public choices: string[] = [];
    public detailsType: string | undefined;
    public optional: boolean = false;
    public voiceInputable: boolean = true;
    public link_position: { id: number, value: any, compare: string } | undefined;
}