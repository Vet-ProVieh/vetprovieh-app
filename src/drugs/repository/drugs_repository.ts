import {BaseRepository} from '@tomuench/vetprovieh-shared/lib';
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
