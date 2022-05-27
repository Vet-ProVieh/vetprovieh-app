import {BaseModel} from '@vetprovieh/vetprovieh-shared';

/**
 * Document-Model
 */
export class Document extends BaseModel {
    public barnId: string | number | undefined;
    public name: string | undefined;
    public content: Blob | null = null;
    public tags: string[] = [];
}
