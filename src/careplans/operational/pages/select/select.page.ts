import { VetproviehList } from "@tomuench/vetprovieh-list/lib/vetprovieh-list";
import { VetproviehElement, VetproviehNavParams, WebComponent } from "@tomuench/vetprovieh-shared/lib";
import { BasicSelectPage } from "../../../../shared";
import { OperationPlan } from "../../models";
import { MeasureOperationPlansRepository, OperationPlansRepository } from "../../repository";

@WebComponent({
    template:
        VetproviehElement.template +
        ` 
      <form id="form">
            <opplan-table id="opPlanList" pagesize="20" pageable="false">
                <template>
                    <div class="columns">
                        <div class="column is-1">
                            <input value="{{id}}" type="checkbox">
                        </div>
                        <div class="column is-1">
                            {{updatedAt}}
                        </div>
                        <div class="column">
                            <strong>{{name}}</strong>
                        </div>
                        <div class="column">
                            <barn-list-show barnid="{{barn.id}}"></barn-list-show>
                        </div>
                        <div class="column">
                            {{values.Diagnose}}
                        </div>
                        <div class="column">
                            {{values.Behandlung}}
                        </div>
                        <div class="column">
                            {{lastVet.userName}}
                        </div>
                    </div>
                    <hr />
                </template>
            </opplan-table>
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
export class OperationPlanSelectPage extends BasicSelectPage {
    private repository: MeasureOperationPlansRepository;

    constructor() {
        super();
        this.repository = new MeasureOperationPlansRepository(
            VetproviehNavParams.getUrlParameter("barnId")
        );
    }
    connectedCallback() {
        super.connectedCallback();


        let list: VetproviehList = this.vetproviehList;
        if (list) list.repository = this.repository;
    }
    /**
     * Return Value
     * @return {any}
     */
    protected get returnValue(): any {
        return this.selectedOperationPlans;
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
        let returnValue: number[] = [];
        inputCheckboxes?.forEach((checkbox) => {
            if ((checkbox as any).checked) {
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