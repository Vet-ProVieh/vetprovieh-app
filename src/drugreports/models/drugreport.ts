import {Drugtreatment} from '../../drugtreatments';
import {BasicModel} from '../../shared';

/**
 * Drug-Report-Model
 */
export class Drugreport extends BasicModel {
    public drugtreatments: Drugtreatment[] = [];
    public guid = '';
    public isReported = true;
    public reportDate = '';
    public reportPeriod = '';
}
