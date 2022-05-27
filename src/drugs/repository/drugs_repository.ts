import {BaseRepository} from '@vetprovieh/vetprovieh-shared';
import {Drug} from '../models';

/**
 * Drugs Repository
 */
export class DrugsRepository extends BaseRepository<Drug> {
  /**
   * Default-Constructor
   */
  constructor() {
    super('/service/drugs');
  }
}
