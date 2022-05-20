import {BaseRepository} from '@tomuench/vetprovieh-shared/lib';
import {Drugreport} from '../models';

/**
 * Drugreport Repository
 */
export class DrugreportRepository extends BaseRepository<Drugreport> {
  /**
   * Default-Constructor
   */
  constructor() {
    super('/service/drugreports');
  }

  /**
   * Get Report
   * @param {string} id
   * @return {Promise}
   */
  report(id: string) {
    return new Promise((resolve, reject) => {
      fetch(`${this.endpoint}/hit/treatment_id/${id}`, {
        method: 'PUT',
      }).then((response) => {
        resolve(response.ok);
      }).catch((response) => {
        reject(response);
      });
    });
  }
}
