import {MeasuresRepository} from './measures_repository';
import {Measure} from '../models';

/**
 * Measurements from proactive Repository
 */
export class MeasureProactiveRepository extends MeasuresRepository {
    private filter = '';

    /**
     * Default-Constructor
     * @param {string} filter
     */
    constructor(filter: string) {
      super();
      this.filter = filter;
    }

    /**
     * Getting All
     * @return {Promise<Measure[]>}
     */
    all(): Promise<Measure[]> {
      return this.proActive(this.filter);
    }
}
