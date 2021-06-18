import { VetproviehNavParams, WebComponent } from "@tomuench/vetprovieh-shared/lib";
import { ActionPlan, Measure } from "../../models";
import { MeasuresRepository } from "../../repository/measures_repository";
import { BasicIndexPage } from "../../../shared";

@WebComponent({
    template: "",
    tag:"vetprovieh-measures"
})
export class MeasuresIndexPage extends BasicIndexPage<Measure> {
    constructor() {
        super(new MeasuresRepository());
    }


}