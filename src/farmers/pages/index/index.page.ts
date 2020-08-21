import { WebComponent } from "@tomuench/vetprovieh-shared/lib";
import { VetproviehList } from "@tomuench/vetprovieh-list/lib/vetprovieh-list";
import { FarmersRepository } from "../../repository/farmers_repository";


@WebComponent({
    template: "",
    tag:"vetprovieh-farmers"
})
export class FarmersIndexPage extends HTMLElement {

    private repository: FarmersRepository = new FarmersRepository();

    constructor() {
        super();
    }
    connectedCallback(){
        let list = document.getElementsByTagName("vetprovieh-list")[0] as VetproviehList;
        list.repository = this.repository;
    }

}