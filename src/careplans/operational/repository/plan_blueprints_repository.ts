import {BaseRepository} from '@vetprovieh/vetprovieh-shared';
import {OperationPlan} from '../models';

/**
 * Blueprint Repository
 */
export class OperationPlanBluerprintsRepository
  extends BaseRepository<OperationPlan> {
  /**
   * Default-Constructor
   */
  constructor() {
    super('/service/operationplans/blueprints');
  }
}
