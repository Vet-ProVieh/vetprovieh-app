import {Barn} from '../../barns';
import {BasicModel} from '../../shared';
import {MeasureGroup} from './group';
import {Objective} from './objective';

/**
 * Measure-Model
 */
export class Measure extends BasicModel {
    public animal = '';
    public animalNumber = '';
    public barnId: number | undefined;
    public barn: Barn | undefined;
    public data: MeasureGroup[] = [];
    public isBlueprint = true;
    public measuresDate = '';
    public objectives: Objective[] = [];
    public therapyFrequency = '';
    public focusOfDiseases = '';
    public isProactive = false;
    public closed = false;
}
