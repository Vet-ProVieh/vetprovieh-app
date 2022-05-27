import {BaseRepository} from '@vetprovieh/vetprovieh-shared';
import {CareplanField} from '../models/careplanField';

/**
 * CareplanField Repository
 */
export class CareplanFieldRepository extends BaseRepository<CareplanField> {
  /**
   * Default-Constructor
   */
  constructor() {
    super('/service/careplans/fields');
  }
}
