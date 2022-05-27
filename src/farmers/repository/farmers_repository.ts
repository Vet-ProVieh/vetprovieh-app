import {BaseRepository} from '@vetprovieh/vetprovieh-shared';
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
