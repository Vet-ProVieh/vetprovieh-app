import { BaseRepository } from "@tomuench/vetprovieh-shared/lib";
import { Drug } from "../models";

export class DrugsRepository extends BaseRepository<Drug>{

    constructor(){
        super("/service/drugs");
    }
}