import {BasicModel} from '../../../shared';

/**
 * Plan Measure Model
 */
export class PlanMeasureModel extends BasicModel {
    public name = '';
    public barn: any;
    public lastVet: any;
    public values: {
        Behandlung: string,
        Diagnose: string,
        Erregernachweis: string,
        Sektion: string,
        Sonstiges: string,
        EmpfohleneMaßnahme: string;
    } | undefined;

    public updatedAt: string | undefined;
}
