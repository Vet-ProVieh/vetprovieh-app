import { ViewHelper } from "@tomuench/vetprovieh-shared";
import { VetproviehDetail } from "@tomuench/vetprovieh-detail";
import { OperationPlan } from "../../models/operations/plan";
import { VpOperationGroup } from "./group";
import { ProcessMenu } from "../../menus/menus.module";
import { VetproviehRepeat } from "../../../../www/bundle";

/**
 * Controller for Page
 * pages/operations/plans/create or edit
 */
export class VpOperationPlan extends VetproviehDetail {

    private _groupElement: VpOperationGroup = new VpOperationGroup();

    constructor() {
        super();
        this.storeElement = true;
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
        if (this.currentObject.opGroups.length > this.groupIdParam) {
            this._groupElement.object = this.currentObject.opGroups[this.groupIdParam];
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
        this._setNavigation();
    }


    _setNavigation() {
        let processMenu = this.getByIdFromShadowRoot("processMenu") as VetproviehRepeat;
        if (processMenu) {
            processMenu.objects = this.currentObject.opGroups;
            let param = this.groupIdParam;
            let link = processMenu.shadowRoot?.querySelector("[href='?groupsId=" + (param == 0 ? '' : param) + "']")
            if (link) {
                link.classList.add("is-active");
            }
        }
    }
}

customElements.define('vp-operation-plan', VpOperationPlan);