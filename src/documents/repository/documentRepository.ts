
import { BaseRepository } from "@tomuench/vetprovieh-shared/lib";
import { Document } from "../models/";
import { v4 as uuidv4 } from 'uuid';

export class DocumentRepository extends BaseRepository<Document>{

    constructor() {
        super("/service/upload/uploadFile");
    }

    
    private _barnId : string = "";
    public get barnId() : string {
        return this._barnId;
    }

    public set barnId(v : string) {
        this._barnId = v;
    }
    

    /**
     * Getting All
     * @returns Promise<T[]>
     */
    all(): Promise<Document[]> {
        return fetch(`${this.endpoint}/barn/${this.barnId}`).then((response) => {
            if(response.status === 404){
                return [];
            }
            return response.json();
        });
    }

    create(document: Document): Promise<any> {
        return new Promise((resolve, reject) => {
            if (document.id == undefined) {
                document.id = DocumentRepository.generateUUID();
                let requestData = this.buildRequestdata(document);
                fetch(this.endpoint, {
                    method: "POST",
                    headers: {

                    },
                    body: requestData
                }).then((response) => {
                    let location = response.headers.get("location") || "";
                    location = location?.substr(location.lastIndexOf("/") + 1);
                    resolve(`/service/upload/uploadFile/${location}`);
                })
                    .catch((e) => reject(false))
            }
        })
    }


    /**
     * Building FormData to send
     * @param {Document} document 
     */
    private buildRequestdata(document: Document): FormData {
        let formData = new FormData();
        formData.append("barnId", (document.barnId as number).toString());
        if (document.content) formData.append("file", document.content);
        formData.append("fileName", document.name as string);
        formData.append("id", document.id as string);
        return formData;
    }

    /**
     * Generating a UUID 
     * @return {string}
     */
    public static generateUUID(): string {
        return uuidv4();
    }
}