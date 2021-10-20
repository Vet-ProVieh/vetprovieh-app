import { OperationPlan } from '../../careplans';
import { Drug } from '../../drugs';
import {BasicModel} from '../../shared';

export class Drugtreatment extends BasicModel {
    public amount = '';
    public animalNumber = '';
    public applicationDays = '';
    public applicationType = '';
    public drugs: Drug[] = [];
    public effectDays = '';
    public isReported = true;
    public operationPlans: OperationPlan|undefined;
    public treatmentDate = '';
    public treatmentType = '';
    public vetId = '';
    public waitingDays = '';
}