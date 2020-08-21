import { WebComponent } from "@tomuench/vetprovieh-shared/lib";
import { BarnsRepository } from "../../repositories/barns_repository";
import { VetproviehList } from "@tomuench/vetprovieh-list/lib/vetprovieh-list";


@WebComponent({
    template: "",
    tag:"vetprovieh-barns"
})
export class BarnsIndexPage{

    private repository: BarnsRepository = new BarnsRepository();

    connectedCallback(){
        let list = document.getElementsByTagName("vetprovieh-list")[0] as VetproviehList;
        list.repository = this.repository;
    }

}