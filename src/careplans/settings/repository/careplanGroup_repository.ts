import {BaseRepository} from '@tomuench/vetprovieh-shared/lib';
import {CareplanGroup} from '../models/careplanGroup';

export class CareplanGroupRepository extends BaseRepository<CareplanGroup> {
  constructor() {
    super('/service/careplans/groups');
  }
}
