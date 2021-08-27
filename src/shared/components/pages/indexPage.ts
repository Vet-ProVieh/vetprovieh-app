import {VetproviehBasicList} from '@tomuench/vetprovieh-list/lib/vetprovieh-basic-list';
import {IRepository, VetproviehNavParams} from '@tomuench/vetprovieh-shared/lib';
import {VetproviehList} from '../../../app/main';

export class BasicIndexPage<T> extends HTMLElement {
    protected repository: IRepository<T>;

    constructor(repository: IRepository<T>) {
      super();
      this.repository = repository;
    }

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

    protected searchByParams(search: { [Identifier: string]: string }) {
      const list: VetproviehList = this.getVetproviehList();
      list.urlSearchParams = search;
      list.search('');
    }

    /**
     * Load VetproviehList Element from DOM
     * @return {VetproviehList}
     */
    protected getVetproviehList() : VetproviehList {
      return document.getElementsByTagName('vetprovieh-list')[0] as VetproviehList;
    }
}
