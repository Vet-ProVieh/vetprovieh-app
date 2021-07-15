import { VetproviehList } from "@tomuench/vetprovieh-list/lib/vetprovieh-list";
import { VetproviehElement, VetproviehNavParams, WebComponent } from "@tomuench/vetprovieh-shared/lib";
import { OperationPlan } from "../../models";
import { OperationPlansRepository } from "../../repository";

@WebComponent({
    template:
        VetproviehElement.template +
        ` 
      <form id="form">
            <vetprovieh-list id="opPlanList" pagesize="20" pageable="false">
                <template>
                    <div>
                        <input value="{{id}}" type="checkbox">
                        <a href="show.html?id={{id}}">
                            <strong>{{name}}</strong>
                        </a>
                        <barn-list-show barnid="{{barn.id}}"></barn-list-show>
                        <p style="font-size:0.9em;">
                            <strong>Erstellt am:</strong> {{createdAt}}<br />
                            <strong>Letztes Update am:</strong> {{updatedAt}}<br />
                        </p>
                    </div>
                    <hr />
                </template>
            </vetprovieh-list>
            <div class="container">
                <div class="columns is-mobile">
                    <div class="column">
                        <input id="abortButton" 
                                class="button is-danger is-fullwidth" 
                                type="reset" value="Abbrechen">                   
                    </div>
                    <div class="column">
                        <input id="takeoverButton" 
                                class="button is-success is-fullwidth" 
                                type="button" value="Übernehmen">
                    </div>
                </div>
            </div>
      </form>
      `,
    tag: "vp-opplan-select"
})
export class OperationPlanSelectPage extends VetproviehElement {
    public static PARAM_KEY = "measures.selectedOperationPlans";
    
    private repository: OperationPlansRepository = new OperationPlansRepository();

    constructor() {
        super(false, false)
        this.loadOperationPlans();
    }

    connectedCallback() {
        this.render();
        this.registerEventListener();
        let list: VetproviehList = this.vetproviehList;
        if(list) list.repository = this.repository;
    }

    /**
     * Load OperationPlans to present them
     */
    private loadOperationPlans() {

    }

    /**
     * Register different Event-Listener
     */
    private registerEventListener() {
        this.takeoverButton.addEventListener('click', (event) => {
            VetproviehNavParams.set(OperationPlanSelectPage.PARAM_KEY, this.selectedOperationPlans);
        })
    }

    /**
     * Load Takeover-Button from DOM
     * @return {HTMLButtonElement}
     */
    private get takeoverButton(): HTMLButtonElement {
        return document.getElementById("takeoverButton") as HTMLButtonElement;
    }

    /**
     * Load Abort-Button from DOM
     * @return {HTMLButtonElement}
     */
    private get abortButton(): HTMLButtonElement {
        return document.getElementById("abortButton") as HTMLButtonElement;
    }

    /**
     * Loading Liste von Operation-Plan
     * @return {VetproviehList}
     */
    private get vetproviehList(): VetproviehList {
        return document.getElementById("opPlanList") as VetproviehList;
    }

    /**
     * Get selected OperationPlans
     * @return {Array<OperationPlan>}
     */
    public get selectedOperationPlans(): Array<OperationPlan> {
        return this.operationPlans
            .filter((operationPlan: OperationPlan) => !!operationPlan.id && this.selectedOperationPlanIds.includes(+operationPlan.id));
    }

    /**
     * Get selected operationPlanIds
     * @return {Array<number>} 
     */
    public get selectedOperationPlanIds(): Array<number> {
        let inputCheckboxes = this.vetproviehList.shadowRoot?.querySelectorAll("input[type='checkbox']");
        let returnValue : number[]= [];
        inputCheckboxes?.forEach((checkbox) => {
            if((checkbox as any).checked){
                returnValue.push(+(checkbox as any).value);
            }
        })
        return returnValue;
    }

    /**
     * Get All visible OperationPlans
     * @return {Array<OperationPlan>}
     */
    public get operationPlans(): Array<OperationPlan> {
        return this.vetproviehList?.objects || [];
    }
}