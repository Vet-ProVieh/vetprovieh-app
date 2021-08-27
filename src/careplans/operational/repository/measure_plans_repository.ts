import {BaseRepository} from '@tomuench/vetprovieh-shared/lib';

export class MeasureOperationPlansRepository extends BaseRepository<any> {
    private barnId: number;

    constructor(barnId: number) {
      super('/service/measures/operationplans/barn');
      this.barnId = barnId;
    }

    private buildQueryUrl() : string {
      return `${this.endpoint}/${this.barnId}`;
    }

    /**
     * Getting All
     * @return Promise<T[]>
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
