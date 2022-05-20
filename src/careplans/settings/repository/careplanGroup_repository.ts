import {BaseRepository} from '@tomuench/vetprovieh-shared/lib';
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
