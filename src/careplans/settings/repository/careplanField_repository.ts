import {BaseRepository} from '@tomuench/vetprovieh-shared/lib';
import {CareplanField} from '../models/careplanField';

export class CareplanFieldRepository extends BaseRepository<CareplanField> {
  constructor() {
    super('/service/careplans/fields');
  }
}
