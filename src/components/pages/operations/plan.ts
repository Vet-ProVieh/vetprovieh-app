import { ViewHelper } from "@tomuench/vetprovieh-shared";
import { VetproviehDetail } from "@tomuench/vetprovieh-detail";
import { OperationPlan } from "../../models/operations/plan";
import { VpOperationGroup } from "./group";

/**
 * Controller for Page
 * pages/operations/plans/create or edit
 */
export class VpOperationPlan extends VetproviehDetail {

    private _groupElement: VpOperationGroup = new VpOperationGroup();

    constructor() {
        super();
    }


    /**
     * Getting current selected OperationPlan
     */
    public get currentObject(): OperationPlan {
        return this._currentObject as OperationPlan;
    }

    /**
     * Group-Position from URL
     * Default = 0
     * @return {number}
     */
    public get groupIdParam(): number {
        return parseInt(ViewHelper.getParameter("groupsId") as string) || 0;
    }

    /**
     * Setting group Component
     */
    _setGroupComponent() {
        if (this.currentObject.groups.length > this.groupIdParam) {
            this._groupElement.group = this.currentObject.groups[this.groupIdParam];
            let detail = this.getByIdFromShadowRoot("group") as HTMLElement;
    
            if (detail) {
                console.log("FOUND");
                detail.appendChild(this._groupElement);
            } else {
                console.log("not found");
            }
    
        }
    }

    /**
     * Overwriteable Callback
     * @param {any} data
     * @protected
     */
    _afterFetch(data: any) {
        this._setGroupComponent();
    }
}

customElements.define('vp-operation-plan', VpOperationPlan);