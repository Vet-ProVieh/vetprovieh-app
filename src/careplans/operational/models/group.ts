import {BasicModel} from '../../../shared';
import {OperationField} from './field';

/**
 * OperationPlanGroup Model
 */
export class OperationGroup extends BasicModel {
    public name = '';
    public opFields: OperationField[] = [];
}
