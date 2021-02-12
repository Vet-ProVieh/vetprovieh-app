
import { BaseRepository } from "@tomuench/vetprovieh-shared/lib";
import { Document } from "../models/";
import { v4 as uuidv4 } from 'uuid';

export class DocumentRepository extends BaseRepository<Document>{

    constructor(){
        super("/service/uploadFile");
    }



    /**
     * Generating a UUID 
     * @return {string}
     */
    public static generateUUID(): string {
        return uuidv4();
    }
}