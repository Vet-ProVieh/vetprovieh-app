import {BasicModel} from '../../../shared';
import {OperationField} from './field';

export class OperationGroup extends BasicModel {
    public name = '';
    public opFields: OperationField[] = [];
}
