
import { BaseRepository } from "@tomuench/vetprovieh-shared/lib";
import { Document } from "../models/";

export class DocumentRepository extends BaseRepository<Document>{

    constructor(){
        super("/service/uploadFile");
    }
}