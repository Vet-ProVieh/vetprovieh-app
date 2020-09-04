import { BasicModel } from "../../../shared";
import { CareplanField } from "./careplanField";


export class CareplanGroup extends BasicModel {

    name: string = "";
    position: number = 0;
    fields: CareplanField[] = []
}