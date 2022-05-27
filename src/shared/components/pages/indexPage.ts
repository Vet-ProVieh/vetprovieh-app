import {VetproviehBasicList}
  from '@vetprovieh/vetprovieh-list';
import {BaseModel, IRepository} from '@vetprovieh/vetprovieh-shared';
import {VetproviehList} from '../../../app/main';


/**
 * BasicIndexPage
 * - used for different types of listing pages
 */
export class BasicIndexPage<T extends BaseModel> extends HTMLElement {
    protected repository: IRepository<T>;

    /**
     * Default-Constructor
     * @param {IRepository<T>} repository
     */
    constructor(repository: IRepository<T>) {
      super();
      this.repository = repository;
    }

    /**
     * Connected-Callback
     */
    connectedCallback() {
      const list: VetproviehList = this.getVetproviehList();
      list.repository = this.repository;
    }

    /**
     * Suche ausführen
     * @param {string} search
     */
    protected attachSearch(search: string) {
      const list: VetproviehList = this.getVetproviehList();
      list.search(search);
    }

    /**
     * Search by Params
     * @param {{string: string}} search
     */
    protected searchByParams(search: { [Identifier: string]: string }) {
      const list: VetproviehList = this.getVetproviehList();
      list.urlSearchParams = search;
      list.search('');
    }

    /**
     * Load VetproviehList Element from DOM
     * @return {VetproviehList}
     */
    protected getVetproviehList(): VetproviehBasicList {
      let list = document.querySelector('vetprovieh-list');
      if ( list == undefined) {
        list = document.querySelector('vetprovieh-table');
      }
      return list as VetproviehBasicList;
    }
}
