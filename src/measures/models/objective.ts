import {ObjectHelper} from '@tomuench/vetprovieh-shared/lib';
import {BasicModel} from '../../shared';
import {KeyResult, KeyResultMilestones} from './keyresult';

/**
 * Objective
 */
export class Objective extends BasicModel {
    public name = '';
    public date = '';
    public position = 0;
    public active = true;
    public welfare = false;
    public keyResults: KeyResult[] = [new KeyResult()];
    public rating = 0;

    /**
     * Resetting Fields to Insert into another Measure
     * @param {Objective} objective
     */
    public static reset(objective: Objective) {
      objective.id = undefined;
      objective.date = ObjectHelper
          .dateToString(ObjectHelper.addDaysToDate(new Date(), 7));
      objective.keyResults
          .forEach((keyResult) => {
            keyResult.milestones = KeyResultMilestones.Start;
          });
    }
}
