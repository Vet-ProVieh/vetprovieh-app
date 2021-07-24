import { VetproviehList } from "@tomuench/vetprovieh-list/lib/vetprovieh-list";
import { VetproviehElement, VetproviehNavParams, WebComponent } from "@tomuench/vetprovieh-shared/lib";
import { BasicSelectPage } from "../../../shared";
import { Objective } from "../../models";
import { ObjectivesRepository } from "../../repository";

@WebComponent({
    template:
        VetproviehElement.template +
        ` 
      <form id="form">
            <vetprovieh-list id="measuresList" pagesize="20" pageable="false">
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
    tag: "vp-measures-select"
})
export class OperationPlanSelectPage extends BasicSelectPage {
    private repository: ObjectivesRepository = new ObjectivesRepository();

    constructor() {
        super();
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
        return document.getElementById("measuresList") as VetproviehList;
    }

    /**
     * Get selected OperationPlans
     * @return {Array<Objective>}
     */
    public get selectedOperationPlans(): Array<Objective> {
        return this.operationPlans
            .filter((operationPlan: Objective) => !!operationPlan.id && this.selectedOperationPlanIds.includes(+operationPlan.id));
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
     * @return {Array<Objective>}
     */
    public get operationPlans(): Array<Objective> {
        return this.vetproviehList?.objects || [];
    }
}