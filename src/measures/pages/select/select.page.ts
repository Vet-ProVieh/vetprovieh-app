import { VetproviehList } from "@tomuench/vetprovieh-list/lib/vetprovieh-list";
import { VetproviehElement, VetproviehNavParams, WebComponent } from "@tomuench/vetprovieh-shared/lib";
import { MeasureOperationPlansRepository } from "../../../careplans/operational/repository";
import { BasicSelectPage } from "../../../shared";
import { Objective } from "../../models";
import { ObjectivesRepository } from "../../repository";

@WebComponent({
    template:
        VetproviehElement.template +
        ` 

        <div class="tabs  is-toggle is-fullwidth is-large">
            <ul>
                <li >
                <a data-id="detail">
                    <span class="icon is-small"><i class="fas fa-scroll" aria-hidden="true"></i></span>
                    <span>Maßnahmen</span>
                </a>
                </li>
                <li class="is-active">
                <a data-id="objectives">
                    <span class="icon is-small"><i class="fas fa-toolbox" aria-hidden="true"></i></span>
                    <span>Maßnahmen aus Betreuung</span>
                </a>
                </li>
            </ul>   
        </div>

        <form id="form">
                <opplan-table id="measuresList" pagesize="20" pageable="false">
                    <div id="header">
                        <div class="columns">
                            <div class="column is-1">
                                <strong>Auswahl?</strong>
                            </div>
                            <div class="column is-1">
                                <strong>Datum</strong>
                            </div>
                            <div class="column">
                                <strong>Diagnose</strong>
                            </div>
                            <div class="column">
                                <strong>Behandlung</strong>
                            </div>
                            <div class="column">
                                <strong>Empfohlene Maßnahmen</strong>
                            </div>
                            <div class="column">
                                <strong>Ausgeführt von</strong>
                            </div>
                        </div>
                    </div>
                    <template>
                        <div class="columns">
                            <div class="column is-1">
                                <input value="{{id}}" type="checkbox">
                            </div>
                            <div class="column is-1">
                                {{updatedAt|date}}
                            </div>
                            <div class="column">
                                {{values.Diagnose}}
                            </div>
                            <div class="column">
                                {{values.Behandlung}}
                            </div>
                            <div class="column">
                                {{values.EmpfohleneMaßnahme}}
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
    tag: "vp-measures-select"
})
export class MeasuresSelectPage extends BasicSelectPage {
    private repository: MeasureOperationPlansRepository;

    constructor() {
        super();

        this.repository = new MeasureOperationPlansRepository(
            VetproviehNavParams.getUrlParameter("barnId")
        );
    }

     /**
     * Getting ParamKey; Can be overriden in subclasses
     * @return {string}
     */
      protected get paramKey() : string {
        return "selectPageMeasure.return";
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