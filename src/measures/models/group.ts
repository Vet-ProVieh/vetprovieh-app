import {BasicModel} from '../../shared';
import {MeasureField} from './field';

/**
 * Measure-Group-Model
 */
export class MeasureGroup extends BasicModel {
    public name = '';
    public details: MeasureField[] = [];
    public position = 0;
}
