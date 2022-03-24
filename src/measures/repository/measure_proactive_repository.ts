import {MeasuresRepository} from './measures_repository';
import {Measure} from '../models';


export class MeasureProactiveRepository extends MeasuresRepository {
    private filter = '';

    constructor(filter: string) {
      super();
      this.filter = filter;
    }

    /**
     * Getting All
     * @return Promise<T[]>
     */
    all(): Promise<Measure[]> {
      return this.proActive(this.filter);
    }
}
