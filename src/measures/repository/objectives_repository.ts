import {BaseRepository} from '@tomuench/vetprovieh-shared/lib';
import {Objective} from '../models';

export class ObjectivesRepository extends BaseRepository<Objective> {
  constructor(barnid: string) {
    super(`/service/measures/objectives/barn/${barnid}`);
  }
}
