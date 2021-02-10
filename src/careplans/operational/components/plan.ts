import { ViewHelper } from "@tomuench/vetprovieh-shared";
import { VetproviehBasicDetail } from "@tomuench/vetprovieh-detail/lib/index";
import { VpOperationGroup } from "./group";
import { WebComponent, VetproviehElement, VetproviehNavParams } from "@tomuench/vetprovieh-shared/lib";
import { OperationPlan } from "../models";
import { ProcessMenu } from "./process-menu";

/**
 * Controller for Page
 * pages/operations/plans/create or edit
 */
@WebComponent({
    template: VetproviehElement.template + ` 
    <form id="form">
        <vetprovieh-notification id="notification">
        </vetprovieh-notification>
        <div id="detail" class="container">
        
        </div>
        <hr/>
        <div class="container">
        <div class="columns">
            <div class="column">
                <input id="abortButton" 
                        class="button is-danger is-fullwidth" 
                        type="reset" value="Abbrechen">                   
            </div>
            <div class="column">
                <input id="saveButton" 
                        class="button is-success is-fullwidth" 
                        type="button" value="Speichern">
            </div>
        </div>
        </div>
    </form>
    `,
    tag: 'vp-operation-plan'
})
export class VpOperationPlan extends VetproviehBasicDetail {

    private _groupElement: VpOperationGroup = new VpOperationGroup();
    private _fetched: boolean = false;

    constructor() {
        super();
        this.storeElement = true;
    }


    render() {
        if (!this._fetched){
            super.render();
            this._attachListenerToButtons();
        }
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
            console.log(`Setting Current-OperationGroup=${this.groupIdParam}`);
            this._groupElement.object = this.currentObject.opGroups[this.groupIdParam];
            let detail = this.getByIdFromShadowRoot("group") as HTMLElement;

            if (detail) {
                detail.appendChild(this._groupElement);
            }
        }
    }

    protected get _storeKey(): string {
        let url = super._storeKey;
        return `${url}?barn_id=${VetproviehNavParams.getUrlParameter("barn_id")}`;
      }

    /**
     * Overwriteable Callback
     * @param {any} data
     * @protected
     */
    _afterFetch(data: any) {
        this._fetched = true;
        this.currentObject.barnId = parseInt(VetproviehNavParams.getUrlParameter("barn_id"));
        this._setGroupComponent();
        setTimeout(() => this._setNavigation(), 500);
    }

    _buildUrl(): string {
        let currentUrl = new URL(window.location.href);

        if (currentUrl.searchParams.has("groupsId")) {
            currentUrl.searchParams.delete("groupsId");
        }
        currentUrl.searchParams.append("groupsId", '')
        return currentUrl.toString();
    }

     /**
     * Attaching Listener to Save and Abort Button
     * @private
     */
  _attachListenerToButtons() {
    const save = this.getByIdFromShadowRoot('saveButton') as HTMLElement;
    const abort = this.getByIdFromShadowRoot('abortButton') as HTMLElement;
    save.addEventListener('click', () => {
        console.log("SAVE");
        this.save()
    });
    abort.addEventListener('click', () => {
      console.log("cancel");
      // Destroy Cached local Data
      VetproviehNavParams.delete(window.location.href);
      window.history.back()
    });
  }

    /**
     * Setting Process-Menu Items and activate current Element
     */
    _setNavigation() {
        let processMenu = this.getByIdFromShadowRoot("processMenu") as ProcessMenu;
        if (processMenu) {
            processMenu.objects = this.currentObject.opGroups;
            processMenu.activateElement(this.groupIdParam);
        }
    }

}