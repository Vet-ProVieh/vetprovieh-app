import { BasicModel } from "../../../shared";
import { CareplanGroup } from "./careplanGroup";

export class Careplan extends BasicModel {

    opGroups: CareplanGroup[] = [];
    animal: string = "";
    readOnly: boolean = false;
}