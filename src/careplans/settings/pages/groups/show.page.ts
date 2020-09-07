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

    private _detailContainer : VetproviehDetail;

    constructor(){
        super();
        this._detailContainer = this.getElementsByTagName("vetprovieh-detail")[0] as VetproviehDetail;
        this._showGroups(this._detailContainer.currentObject as CareplanGroup);
        /*this._detailContainer.addEventListener("loadeddata", (event: any) => {
            this._showGroups((event as LoadedEvent).data as CareplanGroup);
        })*/
    }

    connectedCallback(){
    }

    /**
     * Showing Groups of a Careplan
     * @private
     */
    private _showGroups(careplan: CareplanGroup) {
        if(careplan){
            let groupRepeater = this._detailContainer.getByIdFromShadowRoot("fields") as VetproviehTable;
            groupRepeater.objects = careplan.fields;
            groupRepeater.clearAndRender();
        }
    }
}