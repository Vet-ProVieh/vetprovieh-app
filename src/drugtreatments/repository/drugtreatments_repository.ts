import {BaseRepository} from '@tomuench/vetprovieh-shared/lib';
import { Drugtreatment } from '../models';

export class DrugtreatmentRepository extends BaseRepository<Drugtreatment> {
  constructor() {
    super('/service/drugstreatment');
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
      console.log(this.endpoint);
      if(this._barnId != ''){
        console.log("FILTERED ENDPOINT");
        return fetch(`${this.endpoint}/barn/${this.barnId}`).then((response) => {
          if (response.status === 404) {
            return [];
          }
          return response.json();
        });
      }else{
        console.log("UNFILTERED ENDPOINT!");
        return fetch(`${this.endpoint}`).then((response) => {
          if (response.status === 404) {
            return [];
          }
          return response.json();
        });
      }
    }
}