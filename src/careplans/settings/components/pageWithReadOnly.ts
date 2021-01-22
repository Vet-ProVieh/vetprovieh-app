import { IRepository, VetproviehNavParams, VetproviehTable } from "@tomuench/vetprovieh-shared/lib";
import { BasicShowPage } from "../../../shared";

export class PageWithReadOnly extends BasicShowPage{
    
    /**
     * CurrentView Readonly?
     * @return {boolean}
     */
    protected get readOnly(): boolean{
        return VetproviehNavParams.getUrlParameter("readOnly") == "true";
    }

    protected get readOnlyLinkAttached() : string {
        return this.readOnly ? '&readOnly=true' : '';
    }

    protected markAsReadOnly(){
        if(this.readOnly){
            this.addButton?.classList.add("is-hidden");
            this.detailElement.readOnly = this.readOnly;
        }
    }


    protected get addButton() :HTMLButtonElement {
        return this.detailElement.getByIdFromShadowRoot("addButton") as HTMLButtonElement;
    }

    protected setTemplateForTable(templateContent: string, repository: IRepository<any>){
        let repeater = this.getTable();
        let template: HTMLTemplateElement = document.createElement("template");
        template.innerHTML = templateContent;
        repeater.listTemplate = template.content;
        repeater.repository = repository;
    }

    /**
     * Get Table from DetailElement
     * @return {VetproviehTable}
     */
    protected getTable() : VetproviehTable{
        return this.detailElement.getByIdFromShadowRoot("subItems") as VetproviehTable;
    }
}