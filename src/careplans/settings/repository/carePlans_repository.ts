import { BaseRepository } from "@tomuench/vetprovieh-shared/lib";
import { Careplan } from "../models";

export class CareplansRepository extends BaseRepository<Careplan>{

    constructor(){
        super("/service/careplans");
    }
}