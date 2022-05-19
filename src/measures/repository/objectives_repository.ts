import {BaseRepository} from '@tomuench/vetprovieh-shared/lib';
import {Objective} from '../models';

/**
 * Objectives Repository
 */
export class ObjectivesRepository extends BaseRepository<Objective> {
  /**
   * Default-Constructor
   * @param {string} barnid
   */
  constructor(barnid: string) {
    super(`/service/measures/objectives/barn/${barnid}`);
  }
}
