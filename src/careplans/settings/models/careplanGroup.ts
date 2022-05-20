import {BasicModel} from '../../../shared';
import {CareplanField} from './careplanField';

/**
 * Careplan Group
 */
export class CareplanGroup extends BasicModel {
    name = '';
    position = 0;
    fields: CareplanField[] = []
    active = true;
    isTherapy = false;
}
