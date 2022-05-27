import {BaseRepository} from '@vetprovieh/vetprovieh-shared';
import {OperationPlan} from '../models';

/**
 * OperationPlans Repository
 */
export class OperationPlansRepository extends BaseRepository<OperationPlan> {
  /**
   * Default-Constructor
   */
  constructor() {
    super('/service/operationplans');
  }

  /**
   * Download rendered PDF
   * @param {stirng} id
   * @return {Promise<string|null>}
   */
  downloadPdf(id: string) : Promise<string|null> {
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
}
