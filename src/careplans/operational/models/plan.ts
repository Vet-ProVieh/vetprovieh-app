import {BasicModel} from '../../../shared';
import {OperationGroup} from './group';

/**
 * OperationPlan
 */
export class OperationPlan extends BasicModel {
    public name = '';
    public opGroups: OperationGroup[] = [];
    public barn: any;
}
