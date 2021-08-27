import {BasicModel} from '../../../shared';
import {CareplanField} from './careplanField';


export class CareplanGroup extends BasicModel {
    name = '';
    position = 0;
    fields: CareplanField[] = []
    active = true;
    isTherapy = false;
}
