import {BaseRepository} from '@tomuench/vetprovieh-shared/lib';
import {TreatmentKeys} from '../models';

export class DrugTreatmentKeysRepository extends BaseRepository<TreatmentKeys> {
  constructor() {
    super(`/service/drugtreatments/treatmentKeys`);
  }

  /**
     * Getting All
     * @return Promise<T[]>
     */
  keys(): Promise<string[]> {
    return fetch(this.endpoint).then((response) => {
      if (response.status === 404) {
        return [];
      }
      return response.json();
    });
  }
}
