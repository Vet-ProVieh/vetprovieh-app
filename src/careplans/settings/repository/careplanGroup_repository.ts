import {BaseRepository} from '@vetprovieh/vetprovieh-shared';
import {CareplanGroup} from '../models/careplanGroup';

/**
 * CareplanGroup Repository
 */
export class CareplanGroupRepository extends BaseRepository<CareplanGroup> {
  /**
   * Default-Constructor
   */
  constructor() {
    super('/service/careplans/groups');
  }
}
