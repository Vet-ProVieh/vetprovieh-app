import { WebComponent } from "@tomuench/vetprovieh-shared/lib";
import { VetproviehList } from "@tomuench/vetprovieh-list/lib/vetprovieh-list";
import { FarmersRepository } from "../../repository/farmers_repository";
import { Farmer } from "../../models";
import { BasicIndexPage } from "../../../components/pages/indexPage";


@WebComponent({
    template: "",
    tag:"vetprovieh-farmers"
})
export class FarmersIndexPage extends BasicIndexPage<Farmer> {
    constructor() {
        super(new FarmersRepository());
    }
}