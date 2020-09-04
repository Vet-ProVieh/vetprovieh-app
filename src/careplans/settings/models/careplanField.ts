import { BasicModel } from "../../../shared";

export class CareplanField extends BasicModel{

    name: string = "";
    optional: boolean = true;
    position: number = 0;
    voiceInputable: boolean = false;
}