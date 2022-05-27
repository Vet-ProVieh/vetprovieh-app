import {WebComponent} from '@vetprovieh/vetprovieh-shared';
import {SyncService} from '../../../providers/SyncService';

// eslint-disable-next-line new-cap
@WebComponent({
  tag: 'sync-module',
  template: ``,
})

/**
 * Sync-Component
 */
export class SyncComponent extends HTMLElement {
    private syncService: SyncService = new SyncService();

    /**
     * Default-Constructor
     */
    constructor() {
      super();
      this.syncService.loadData();
    }
}
