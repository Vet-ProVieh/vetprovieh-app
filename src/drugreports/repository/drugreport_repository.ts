import {BaseRepository} from '@tomuench/vetprovieh-shared/lib';
import { Drugreport } from '../models';

export class DrugreportRepository extends BaseRepository<Drugreport> {
  constructor() {
    super('/service/drugreports');
  }

  //Report treatments to make drugreport
  report(id: string){
    return new Promise((resolve, reject) => {
      fetch(`${this.endpoint}/hit/treatment_id/${id}`, {
        method: 'PUT'
      }).then((response) => {
        resolve(response.ok);
      }).catch((response) => {
        reject(false);
      })
    })
  }
}