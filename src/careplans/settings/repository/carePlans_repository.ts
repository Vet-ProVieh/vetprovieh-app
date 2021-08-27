import {BaseRepository} from '@tomuench/vetprovieh-shared/lib';
import {Careplan} from '../models';

/**
 * Repository for Careplans
 */
export class CareplansRepository extends BaseRepository<Careplan> {
  constructor() {
    super('/service/careplans');
  }

  /**
     * Dulicate a Careplan
     * @param {number} id
     */
  duplicate(id: number): Promise<boolean> {
    return new Promise((resolve, reject) => {
      fetch(`${this.endpoint}/${id}/duplicate`, {
        method: 'POST',
        body: null,
      }).then((response) => {
        resolve(response.ok);
      }).catch((response) => {
        resolve(false);
      });
    });
  }
}
