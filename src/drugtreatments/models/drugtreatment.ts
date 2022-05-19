import {OperationPlan} from '../../careplans';
import {Drug} from '../../drugs';
import {BasicModel} from '../../shared';
import {Barn} from '../../barns';

/**
 * Drug-Treatment Model
 */
export class Drugtreatment extends BasicModel {
    public amount = '';
    public animalNumber = '';
    public applicationDays = '';
    public applicationType = '';
    public drugs: Drug[] = [];
    public effectDays = '';
    public isReported = true;
    public operationPlans: OperationPlan|undefined;
    public barn: Barn|undefined;
    public treatmentDate = '';
    public treatmentType = '';
    public vetId = '';
    public waitingDays = '';
}
