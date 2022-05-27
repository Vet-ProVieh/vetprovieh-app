import {BaseRepository} from '@vetprovieh/vetprovieh-shared';
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
