import { WebComponent, VetproviehTable } from "@tomuench/vetprovieh-shared/lib";
import { LoadedEvent } from "@tomuench/vetprovieh-detail/lib/loaded-event";
import { BasicShowPage } from "../../../../shared";
import { VetproviehDetail } from "../../../../app/main";
import { CareplanGroup } from "../../models/careplanGroup";

@WebComponent({
    template: "",
    tag: "careplan-group-page"
})
export class CarePlanGroupShowPage extends BasicShowPage {

    connectedCallback(){
        this.detailElement.addEventListener("loadeddata", (event: any) => {
            this._showGroups(this.detailElement.currentObject as CareplanGroup);
        });
    }

    /**
     * Showing Groups of a Careplan
     * @param {CareplanGroup} careplan
     * @private
     */
    private _showGroups(careplan: CareplanGroup) {
        if(careplan){
            let groupRepeater = this.detailElement.getByIdFromShadowRoot("fields") as VetproviehTable;
            groupRepeater.objects = careplan.fields;
            groupRepeater.clearAndRender();
        }
    }
}