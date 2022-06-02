import {BaseRepository} from '@vetprovieh/vetprovieh-shared';
import {Measure} from '../models';

/**
 * Measures Repository
 */
export class MeasuresRepository extends BaseRepository<Measure> {
  /**
   * Default-Constructor
   */
  constructor() {
    super('/service/measures');
  }

  /**
   * Open Measures for Barn
   * @param {number}barnId
   * @return {Promise<Measure[]>}
   */
  openMeasuresForBarn(barnId: number): Promise<Measure[]> {
    return this.executeRequest<Measure[]>(
        `/service/barns/${barnId}/currentMeasures/`,
        []);
  }

  /**
   * Normal Http Get for an Endpoint
   * @param {string} url
   * @param {T} emptyValue
   * @return {Promise<T>}
   */
  private executeRequest<T>(url: string, emptyValue: T) : Promise<T> {
    return fetch(url)
        .then((response) => {
          if (response.ok) {
            return response.json();
          } else {
            throw Error(response.statusText);
          }
        }).catch((error) => {
          console.warn(error);
          return emptyValue;
        });
  }


  /**
   * Loading Proactive Results for Diagnosis
   * @param {string} focusOfDiseases
   * @return {Promise<Measure[]>}
   */
  proActive(focusOfDiseases: string): Promise<Measure[]> {
    const param = btoa(focusOfDiseases);

    return this.executeRequest<Measure[]>(
        `/service/measures/proactive/${param}`,
        []);
  }

  /**
    * Suche mit Parametern
    * @param {any} params
    * @return {Promise<Measure[]>}
    */
  whereByParams(params: { [Identifier: string]: string }): Promise<Measure[]> {
    if (params.type==='open') {
      return this.openMeasuresForBarn(+params.barnId);
    } else {
      return super.whereByParams(params);
    }
  }

  /**
   * Download rendered PDF
   * @param {stirng} id
   * @return {Promise<string|null>}
   */
  downloadPdf(id: string): Promise<string | null> {
    return new Promise((resolve, reject) => {
      fetch(`${this.endpoint}/createReport/${id}/pdf`)
          .then((response) => {
            if (response.ok) {
              response.blob().then(((blob) => {
                resolve(URL.createObjectURL(blob));
              }));
            } else {
              reject(response);
            }
          }).catch((error) => {
            console.warn(error);
            reject(error);
          });
    });
  }

  /**
   * Get last filledout Measure for Barn
   * @param {number} barnId
   * @return {Promise<Measure>}
   */
  lastforBarn(barnId: number): Promise<Measure> {
    return this.executeRequest<Measure>(
        `${this.endpoint}/barn/${barnId}/last`,
        new Measure());
  }
}
