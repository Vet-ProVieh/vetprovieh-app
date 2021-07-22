import { VetproviehNavParams, WebComponent } from "@tomuench/vetprovieh-shared/lib";
import { ActionPlan, Measure } from "../../models";
import { MeasuresRepository } from "../../repository/measures_repository";
import { BasicIndexPage } from "../../../shared";
import { MeasuresList } from "../../components";

@WebComponent({
    template: "",
    tag:"vetprovieh-measures"
})
export class MeasuresIndexPage extends BasicIndexPage<Measure> {
    constructor() {
        super(new MeasuresRepository());
    }


    /**
     * Load VetproviehList Element from DOM
     * @return {MeasuresList}
     */
     protected getVetproviehList() : MeasuresList {
        return document.getElementsByTagName("measures-list")[0] as MeasuresList;
    }


}