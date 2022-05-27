import {BaseRepository} from '@vetprovieh/vetprovieh-shared';
import {Careplan} from '../models';

/**
 * Repository for Careplans
 */
export class CareplansRepository extends BaseRepository<Careplan> {
  /**
   * Default-Constructor
   */
  constructor() {
    super('/service/careplans');
  }

  /**
     * Dulicate a Careplan
     * @param {number} id
     * @return {Promise<boolean>}
     */
  duplicate(id: number): Promise<boolean> {
    return new Promise((resolve, reject) => {
      fetch(`${this.endpoint}/${id}/duplicate`, {
        method: 'POST',
        body: null,
      }).then((response) => {
        resolve(response.ok);
      }).catch((response) => {
        console.warn(response);
        reject(response);
      });
    });
  }
}
