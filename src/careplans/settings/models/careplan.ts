import {BasicModel} from '../../../shared';
import {CareplanGroup} from './careplanGroup';

export class Careplan extends BasicModel {
    groups: CareplanGroup[] = [];
    animal = '';
    readOnly = false;
}
