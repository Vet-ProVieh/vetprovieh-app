import { WebComponent } from "@tomuench/vetprovieh-shared/lib";
import { VetproviehList } from "@tomuench/vetprovieh-list/lib/vetprovieh-list";
import { BarnsRepository } from "../../repository";
import { BasicIndexPage } from "../../../components/pages/indexPage";
import { Barn } from "../../models";


@WebComponent({
    template: "",
    tag:"vetprovieh-barns"
})
export class BarnsIndexPage extends BasicIndexPage<Barn> {
    constructor() {
        super(new BarnsRepository());
    }
}