import { BaseModel } from "@tomuench/vetprovieh-shared/lib/orm/baseModel";

export class Document extends BaseModel {
    
    public barnId: number | undefined;
    public name: string | undefined;
    public content: Blob | null = null;

}