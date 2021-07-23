import { BasicModel } from "../../shared";
import { MeasureField } from "./field";

export class MeasureGroup extends BasicModel{
    public name: string = "";
    public details: MeasureField[] = [];
    public position: number = 0;
}