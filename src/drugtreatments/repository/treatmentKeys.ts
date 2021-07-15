import { BaseRepository } from "@tomuench/vetprovieh-shared/lib";
import { TreatmentKeys } from "../models";

export class DrugTreatmentKeysRepository extends BaseRepository<TreatmentKeys> {
    constructor() {
        super(`/service/drugstreatment/treatmentKeys`);
    }

    /**
     * Getting All
     * @returns Promise<T[]>
     */
     keys(): Promise<TreatmentKeys> {
        return fetch(this.endpoint).then((response) => {
            if(response.status === 404){
                return [];
            }
            return response.json();
        });
    }
}