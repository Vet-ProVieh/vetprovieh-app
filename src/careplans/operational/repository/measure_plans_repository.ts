import {BaseRepository} from '@tomuench/vetprovieh-shared/lib';

/**
 * MeasureOperationPlansRepository
 * ---------------------------------
 * Load Operation-Plans for a measure
 */
export class MeasureOperationPlansRepository extends BaseRepository<any> {
    private barnId: number;

    /**
     * Default-Constructor
     * @param {number} barnId
     */
    constructor(barnId: number) {
      super('/service/measures/operationplans/barn');
      this.barnId = barnId;
    }

    /**
     * Generate URL for fetch?
     * @return {string}
     */
    private buildQueryUrl() : string {
      return `${this.endpoint}/${this.barnId}`;
    }

    /**
     * Getting All
     * @return {Promise<any[]>}
     */
    all(): Promise<any[]> {
      return fetch(this.buildQueryUrl()).then((response) => {
        if (response.status === 404) {
          return [];
        }
        return response.json();
      });
    }
}
