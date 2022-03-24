import {Drugtreatment} from '../../drugtreatments';
import {BasicModel} from '../../shared';

export class Drugreport extends BasicModel {
    public drugtreatments: Drugtreatment[] = [];
    public guid = '';
    public isReported = true;
    public reportDate = '';
    public reportPeriod = '';
}
