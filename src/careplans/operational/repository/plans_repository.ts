import {BaseRepository} from '@tomuench/vetprovieh-shared/lib';
import {OperationPlan} from '../models';

export class OperationPlansRepository extends BaseRepository<OperationPlan> {
  constructor() {
    super('/service/operationplans');
  }

  /**
   * Download rendered PDF
   * @param {stirng} id 
   * @returns {Promise<string|null>}
   */
   downloadPdf(id: string) : Promise<string|null> {
    return new Promise((resolve, reject) => {
      fetch(`${this.endpoint}/createReport/${id}/pdf`)
      .then((response) => {
        if(response.ok){
          response.blob().then(((blob) => {
            resolve(URL.createObjectURL(blob));
          }));          
        } else {
          reject(null);
        }
      }).catch((error) => {
        console.log(error); 
        reject(null);
      })
    });
  }
}
