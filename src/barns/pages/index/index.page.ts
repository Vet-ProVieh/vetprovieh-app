import { WebComponent } from "@tomuench/vetprovieh-shared/lib";
import { VetproviehList } from "@tomuench/vetprovieh-list/lib/vetprovieh-list";
import { BarnsRepository } from "../../repository";


@WebComponent({
    template: "",
    tag:"vetprovieh-barns"
})
export class BarnsIndexPage extends HTMLElement {

    private repository: BarnsRepository = new BarnsRepository();

    constructor() {
        super();
    }

    connectedCallback(){
        let list = document.getElementsByTagName("vetprovieh-list")[0] as VetproviehList;
        list.repository = this.repository;
    }

}