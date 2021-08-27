import {BaseRepository} from '@tomuench/vetprovieh-shared/lib';
import {Measure} from '../models';

export class MeasuresRepository extends BaseRepository<Measure> {
  constructor() {
    super('/service/measures');
  }

  /**
   * Open Measures for Barn
   * @param barnId
   * @returns
   */
  openMeasuresForBarn(barnId: number): Promise<Measure[]> {
    return fetch(`/service/barns/${barnId}/currentMeasures/`)
        .then((response) => {
          if (response.ok) {
            return response.json();
          } else {
            throw Error(response.statusText);
          }
        }).catch((error) => {
          return [];
        });
  }
  /**
    * Suche mit Parametern
    * @param {{ [Identifier: string]: string }} params
    * @returns Promise<T[]>
    */
  whereByParams(params: { [Identifier: string]: string }) : Promise<Measure[]> {
    if (params.type == 'open') {
      return this.openMeasuresForBarn(+params.barnId);
    } else {
      return super.whereByParams(params);
    }
  }

  /**
   * Get last filledout Measure for Barn
   * @param {number} barnId
   * @return {Promise<Measure>}
   */
  lastforBarn(barnId: number): Promise<Measure> {
    return fetch(`${this.endpoint}/barn/${barnId}/last`)
        .then((response) => {
          if (response.ok) {
            return response.json();
          } else {
            throw Error(response.statusText);
          }
        }).catch((error) => {
          return undefined;
        });
  }
}
