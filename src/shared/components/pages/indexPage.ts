import { IRepository } from "@tomuench/vetprovieh-shared/lib";
import { VetproviehList } from "../../../app/main";

export class BasicIndexPage<T> extends HTMLElement {

    private repository: IRepository<T>;

    constructor(repository: IRepository<T>) {
        super();
        this.repository = repository;
    }

    connectedCallback() {
        let list = document.getElementsByTagName("vetprovieh-list")[0] as VetproviehList;
        list.repository = this.repository;
    }

}