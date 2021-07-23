import { BaseRepository } from "@tomuench/vetprovieh-shared/lib";

export class MeasureOperationPlansRepository extends BaseRepository<any>{

    private barnId: number;

    constructor(barnId: number){
        super("/service/measures/operationplans/");
        this.barnId = barnId;
    }

    private buildQueryUrl() : string {
        return `${this.endpoint}?barnId=${this.barnId}`;
    }

      /**
     * Getting All
     * @returns Promise<T[]>
     */
       all(): Promise<T[]> {
        return fetch(this.buildQueryUrl()).then((response) => {
            if(response.status === 404){
                return [];
            }
            return response.json();
        });
    }

}