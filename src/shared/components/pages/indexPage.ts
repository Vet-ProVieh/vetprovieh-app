import {VetproviehBasicList} from '@tomuench/vetprovieh-list/lib/vetprovieh-basic-list';
import {IRepository} from '@tomuench/vetprovieh-shared/lib';
import {VetproviehList} from '../../../app/main';

export class BasicIndexPage<T> extends HTMLElement {
    protected repository: IRepository<T>;

    constructor(repository: IRepository<T>) {
      super();
      this.repository = repository;
    }

    connectedCallback() {
      console.log("ConnectedCallback");
      const list: VetproviehList = this.getVetproviehList();
      console.log(list);
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
    protected getVetproviehList(): VetproviehBasicList {
      console.log(document.getElementsByTagName('vetprovieh-list')[0] != undefined);
      if(document.getElementsByTagName('vetprovieh-list')[0] == undefined){
        return document.getElementsByTagName('vetprovieh-table')[0] as VetproviehBasicList;
      }else{
        return document.getElementsByTagName('vetprovieh-list')[0] as VetproviehBasicList;
      }
    }
}
