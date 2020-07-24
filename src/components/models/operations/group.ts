import { BasicModel } from "../basic";
import { OperationField } from "./field";

export class OperationGroup extends BasicModel{
    public name: string = "";
    public opFields: OperationField[] = [];
}