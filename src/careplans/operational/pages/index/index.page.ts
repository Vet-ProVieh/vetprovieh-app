import { WebComponent } from "@tomuench/vetprovieh-shared/lib";
import { OperationPlan } from "../../models";
import { BasicIndexPage } from "../../../../components/pages/indexPage";
import { OperationPlansRepository } from "../../repository/plans_repository";

@WebComponent({
    template: "",
    tag:"vetprovieh-operation-plans"
})
export class OpertionPlanIndexPage extends BasicIndexPage<OperationPlan> {
    constructor() {
        super(new OperationPlansRepository());
    }
}