import {BaseRepository} from '@vetprovieh/vetprovieh-shared';
import {OperationPlan} from '../models';

/**
 * OperationPlans Repository
 */
export class OperationPlansRepository extends BaseRepository<OperationPlan>
  implements IPdfRepository {
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
  async downloadPdf(id: string): Promise<string | null> {
    try {
      const response = await fetch(`${this.endpoint}/createReport/${id}/pdf`);
      const blobInResponse = await response.blob();
      return URL.createObjectURL(blobInResponse);
    } catch (error) {// here goes if someAsyncPromise() rejected}
      console.warn(error);
      throw error;
    }
  }
}
