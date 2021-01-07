import { WebComponent } from "@tomuench/vetprovieh-shared/lib";
import { BasicIndexPage } from "../../../shared";
import { Document } from "../../models";
import { DocumentRepository } from "../../repository";


@WebComponent({
    template: "",
    tag:"vetprovieh-documents"
})
export class DocumentsIndexPage extends BasicIndexPage<Document> {
    constructor() {
        super(new DocumentRepository());
    }
}