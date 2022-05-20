import {BaseRepository} from '@tomuench/vetprovieh-shared/lib';
import {Farmer} from '../models/farmer';

/**
 * Farmers-Repository
 */
export class FarmersRepository extends BaseRepository<Farmer> {
  /**
   * Default-Constructor
   */
  constructor() {
    super('/service/farmers');
  }
}
