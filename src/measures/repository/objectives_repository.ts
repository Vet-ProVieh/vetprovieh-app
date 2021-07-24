import { BaseRepository } from "@tomuench/vetprovieh-shared/lib";
import { Objective } from "../models";

export class ObjectivesRepository extends BaseRepository<Objective>{

    constructor(){
        super("/service/measures/objectives");
    }

}