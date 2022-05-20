import {BasicModel} from '../../../shared';
import {CareplanGroup} from './careplanGroup';

/**
 * Careplan-Model
 */
export class Careplan extends BasicModel {
    groups: CareplanGroup[] = [];
    animal = '';
    readOnly = false;
}
