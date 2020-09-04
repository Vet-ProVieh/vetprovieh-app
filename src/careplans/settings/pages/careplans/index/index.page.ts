import { WebComponent } from "@tomuench/vetprovieh-shared/lib";
import { CareplansRepository } from "../../../repository/carePlans_repository";
import { Careplan } from "../../../models";
import { BasicIndexPage } from "../../../../../shared";

@WebComponent({
    template: "",
    tag:"vetprovieh-careplans"
})
export class CarePlanIndexPage extends BasicIndexPage<Careplan> {
    constructor() {
        super(new CareplansRepository());
    }
}