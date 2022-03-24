import {IRepository} from '@tomuench/vetprovieh-shared/lib';
import {BaseModel} from '@tomuench/vetprovieh-shared/lib/orm/baseModel';
import {BarnsRepository} from '../../barns/repository';
import {OperationPlanBluerprintsRepository}
  from '../../careplans/operational/repository';
import {FarmersRepository} from '../../farmers';

/**
 * Synchronizing Data with Workbox
 */
export class SyncService {
    private repositories: Array<IRepository<BaseModel>> = [
      new BarnsRepository(),
      new FarmersRepository(),
      new OperationPlanBluerprintsRepository(),
    ];

    /**
     * Loading Data to Store offline.
     * Offline Storage is handeld by Workbox.
     */
    public loadData() {
      this.repositories.forEach((repository) => {
        repository.all().then(() => {
          console.log(`${repository.constructor.name} loaded data`);
        }).catch((error) => {
          console.error(`${repository.constructor.name} could not load data`);
          console.error(error);
        });
      });
    }
}
