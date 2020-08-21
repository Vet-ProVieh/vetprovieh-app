import { BaseRepository } from "@tomuench/vetprovieh-shared/lib";
import { OperationPlan } from "../models";

export class OperationPlansRepository extends BaseRepository<OperationPlan>{

    constructor(){
        super("/service/operationplans");
    }
}