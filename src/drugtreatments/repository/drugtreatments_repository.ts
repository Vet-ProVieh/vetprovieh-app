import {BaseRepository} from '@vetprovieh/vetprovieh-shared';
import {Drugtreatment} from '../models';

/**
 * DrugTreatments Repository
 */
export class DrugtreatmentRepository extends BaseRepository<Drugtreatment> {
  private _barnId = '';

  /**
   * Default-Constructor
   */
  constructor() {
    super('/service/drugtreatments');
  }

  /**
  * Getting All
  * @return {Promise<Drugtreatment[]>}
  */
  all(): Promise<Drugtreatment[]> {
    let url = `${this.endpoint}`;
    if (this._barnId !=='' && this._barnId !==null) {
      url = `${this.endpoint}/barn/${this.barnId}`;
    }

    return fetch(url)
        .then((response) => {
          if (response.status === 404) {
            return [];
          }
          return response.json();
        });
  }


  /**
 * Getter barnId
 * @return {string}
 */
  public get barnId() : string {
    return this._barnId;
  }

  /**
   * setter barnId
   * @param {string} v
   */
  public set barnId(v : string) {
    if (this._barnId !== v) {
      this._barnId = v;
    }
  }
}
