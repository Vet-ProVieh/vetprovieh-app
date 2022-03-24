import {WebComponent} from '@tomuench/vetprovieh-shared/lib';
import {SyncService} from '../../../providers/SyncService';

// eslint-disable-next-line new-cap
@WebComponent({
  tag: 'sync-module',
  template: ``,
})
export class SyncComponent extends HTMLElement {
    private syncService: SyncService = new SyncService();

    constructor() {
      super();
      this.syncService.loadData();
    }
}
