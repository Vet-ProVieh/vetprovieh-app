import { BaseRepository } from "@tomuench/vetprovieh-shared/lib";
import { OperationPlan } from "../models";

export class OperationPlanBluerprintsRepository extends BaseRepository<OperationPlan>{

    constructor(){
        super("/service/operationplans/blueprints");
    }
}