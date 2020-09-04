import { WebComponent, VetproviehRepeat } from "@tomuench/vetprovieh-shared/lib";
import { Careplan } from "../../../models";
import { VetproviehDetail } from "../../../../../app/main";
import { LoadedEvent } from "@tomuench/vetprovieh-detail/lib/loaded-event";
import { BasicShowPage } from "../../../../../shared";

@WebComponent({
    template: "",
    tag: "careplan-page"
})
export class CarePlanShowPage extends BasicShowPage {

    private _detailContainer : VetproviehDetail;

    constructor(){
        super();
        this._detailContainer = this.getElementsByTagName("vetprovieh-detail")[0] as VetproviehDetail;
        this._detailContainer.addEventListener("loadeddata", (event: any) => {
            this._showGroups((event as LoadedEvent).data as Careplan);
        })
    }

    connectedCallback(){
    }

    /**
     * Showing Groups of a Careplan
     * @private
     */
    private _showGroups(careplan: Careplan) {
        if(careplan){
            let groupRepeater = this._detailContainer.getByIdFromShadowRoot("groups") as VetproviehRepeat;
            groupRepeater.objects = careplan.groups;
        }
    }
}