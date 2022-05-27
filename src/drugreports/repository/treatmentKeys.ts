import {BaseRepository} from '@vetprovieh/vetprovieh-shared';
import {TreatmentKeys} from '../../drugtreatments';

/**
 * DrugTreatmentKeys Repository
 */
export class DrugTreatmentKeysRepository extends BaseRepository<TreatmentKeys> {
  /**
   * Default-Constructor
   */
  constructor() {
    super(`/service/drugtreatments/treatmentKeys`);
  }

  /**
     * Getting All
     * @return {Promise<string[]>}
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
