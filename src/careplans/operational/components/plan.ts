import { ViewHelper } from "@tomuench/vetprovieh-shared";
import { VetproviehBasicDetail } from "@tomuench/vetprovieh-detail/lib/index";
import { VpOperationGroup } from "./group";
import { WebComponent, VetproviehElement, VetproviehNavParams } from "@tomuench/vetprovieh-shared/lib";
import { OperationPlan } from "../models";
import { ProcessMenu } from "./process-menu";
import { VetproviehSidemenu } from "../../../app/main";
import { BarnListShow } from "../../../barns";
import { SpeechAssistant } from "../../../shared";

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
            <div class="columns is-mobile">
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

    private _groupElement: VpOperationGroup | undefined;
    private _fetched: boolean = false;

    constructor() {
        super();
        this.storeElement = true;
    }


    render() {
        if (!this._fetched) {
            super.render();
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
            this._groupElement = new VpOperationGroup(this.currentObject.barnId as any);
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
        let barnUrlId = VetproviehNavParams.getUrlParameter("barn_id");
        console.log("Setting barnid")
        if (barnUrlId != null && barnUrlId != undefined) {
            this.currentObject.barnId = parseInt(barnUrlId);
            this.shadowRoot?.querySelectorAll("barn-list-show").forEach((barnShow: any) => {
                barnShow.barnid = barnUrlId;
            })
            this.rightMenu.shadowRoot?.querySelectorAll("barn-list-show").forEach((barnShow: any) => {
                barnShow.barnid = barnUrlId;
            })
        }
        this._setGroupComponent();
        setTimeout(() => this._setNavigation(), 300);
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
        console.log("Plan: Listener to Button");
        const saveButton = this.getByIdFromShadowRoot('saveButton') as HTMLElement;
        const abort = this.getByIdFromShadowRoot('abortButton') as HTMLElement;

        saveButton.addEventListener('click', () => {
            this.save()
        });
        abort.addEventListener('click', () => {
            console.log("cancel");
            // Destroy Cached local Data
            VetproviehNavParams.delete(window.location.href);
            window.history.back()
        });
    }

    save() {
        console.log("Saving");
        super.save();
    }

    /**
     * Setting Process-Menu Items and activate current Element
     */
    _setNavigation() {
        let processMenu1 = this.getByIdFromShadowRoot("processMenu") as ProcessMenu;
        let processMenu2 = this.rightMenu.getByIdFromShadowRoot("processMenu2") as ProcessMenu;
        [processMenu1, processMenu2].forEach((processMenu) => {
            if (processMenu) {
                processMenu.objects = this.currentObject.opGroups;
                processMenu.activateElement(this.groupIdParam);
            }
        });

        this.registerResponsiveButtons();

        let assistant = this.getByIdFromShadowRoot("speechAssistant") as SpeechAssistant
        if(assistant){
            assistant.activate();
        }
    }

    private get rightMenu(): VetproviehSidemenu {
        return this.getByIdFromShadowRoot("right-menu") as VetproviehSidemenu;
    }

    private registerResponsiveButtons() {

        let openFunc = () => {
            this.rightMenu.dispatchEvent(new Event('toggle'));
        };
        openFunc.bind(this);
        this.openButton.addEventListener("click", openFunc);

    }

    private get openButton(): HTMLElement {
        return this.getByIdFromShadowRoot("openButton") as HTMLElement;
    }
}