import { MeasuresRepository } from "./measures_repository";
import { Measure } from "../models";


export class MeasureProactiveRepository extends MeasuresRepository {

    private filter: string = "";

    constructor(filter: string) {
        super();
        this.filter = filter;
    }

      /**
     * Getting All
     * @returns Promise<T[]>
     */
       all(): Promise<Measure[]> {
        return this.proActive(this.filter);
    }
}