import { BaseRepository } from "@tomuench/vetprovieh-shared/lib";
import { Farmer } from "../model/farmer";

export class FarmersRepository extends BaseRepository<Farmer>{

    constructor(){
        super("/service/farmers");
    }
}