import {BaseRepository} from '@tomuench/vetprovieh-shared/lib';
import {Barn} from '../models/barn';

/**
 * Barn-Repository
 */
export class BarnsRepository extends BaseRepository<Barn> {
  /**
   * Default-Constructor
   */
  constructor() {
    super('/service/barns');
  }
}
