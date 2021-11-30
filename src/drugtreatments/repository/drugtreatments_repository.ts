import {BaseRepository} from '@tomuench/vetprovieh-shared/lib';
import { Drugtreatment } from '../models';

export class DrugtreatmentRepository extends BaseRepository<Drugtreatment> {
  constructor() {
    super('/service/drugtreatments');
  }


  private _barnId = '';
  public get barnId() : string {
    return this._barnId;
  }

  public set barnId(v : string) {
    this._barnId = v;
  }

  
    /**
    * Getting All
    * @return Promise<T[]>
    */
    all(): Promise<Drugtreatment[]> {
      if(this._barnId != '' && this._barnId != null){
        return fetch(`${this.endpoint}/barn/${this.barnId}`).then((response) => {
          if (response.status === 404) {
            return [];
          }
          return response.json();
        });
      }else{
        return fetch(`${this.endpoint}`).then((response) => {
          if (response.status === 404) {
            return [];
          }
          return response.json();
        });
      }
    }
}