import { WebComponent } from "@tomuench/vetprovieh-shared/lib";
import { BasicIndexPage } from "../../../../../components/pages/indexPage";
import { CareplansRepository } from "../../../repository/carePlans_repository";
import { Careplan } from "../../../models";

@WebComponent({
    template: "",
    tag:"vetprovieh-careplans"
})
export class CarePlanIndexPage extends BasicIndexPage<Careplan> {
    constructor() {
        super(new CareplansRepository());
    }
}