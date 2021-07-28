import { BasicModel } from "../../../shared";

export class PlanMeasureModel extends BasicModel {

    public name: string = "";
    public barn: any;
    public lastVet: any;
    public values: {
        Behandlung: string,
        Diagnose: string,
        Erregernachweis: string,
        Sektion: string,
        Sonstiges: string
    } | undefined;

    public updatedAt: string | undefined;
}