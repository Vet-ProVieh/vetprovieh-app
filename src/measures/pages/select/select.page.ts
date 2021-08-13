import { VetproviehList } from "@tomuench/vetprovieh-list/lib/vetprovieh-list";
import { ObjectHelper, VetproviehElement, VetproviehNavParams, WebComponent } from "@tomuench/vetprovieh-shared/lib";
import { PlanMeasureModel } from "../../../careplans/operational/models/planMeasure";
import { MeasureOperationPlansRepository } from "../../../careplans/operational/repository";
import { BasicSelectPage } from "../../../shared";
import { Objective } from "../../models";
import { KeyResult } from "../../models/keyresult";
import { ObjectivesRepository } from "../../repository";

@WebComponent({
    template:
        VetproviehElement.template +
        ` 

        <div class="tabs is-toggle is-fullwidth">
            <ul>
                <li >
                <a data-id="measures">
                    <span class="icon is-small"><i class="fas fa-scroll" aria-hidden="true"></i></span>
                    <span>Maßnahmen</span>
                </a>
                </li>
                <li class="is-active">
                <a data-id="opplans">
                    <span class="icon is-small"><i class="fas fa-toolbox" aria-hidden="true"></i></span>
                    <span class="is-hidden-touch">Maßnahmen aus Betreuung</span>
                    <span class="is-hidden-desktop">Betreuung</span>
                    ( <span id="selectedObjectives">0</span> )
                </a>
                </li>
            </ul>   
        </div>

        <form id="form">
            <div id="measures" class="is-hidden">
                <objectives-list id="objectivesList" pagesize="20">
                        <template>
                        <div class="columns is-mobile">
                            <div class="column is-1">
                                <input value="{{id}}" type="checkbox">
                            </div>
                            <div class="column">
                                {{name}}
                            </div>
                            <div class="column  is-2">
                                <vp-stars editable="false" score="{{rating}}"></vp-stars>
                            </div>
                        </div>
                        <hr style="margin:0px;" />
                    </template>
                </objectives-list>
            </div>
            <div id="opplans">
                <opplan-table id="measuresList" pagesize="20" pageable="false">
                    <div id="header">
                        <div class="columns is-mobile">
                            <div class="column is-1">
                                <strong class="is-hidden-touch">Auswahl?</strong>
                            </div>
                            <div class="column is-1-desktop is-3-mobile">
                                <strong>Datum</strong>
                            </div>
                            <div clasvetproviehList
                            <div class="column">
                                <strong>Behandlung</strong>
                            </div>
                            <div class="column is-hidden-touch">
                                <strong>Empfohlene Maßnahmen</strong>
                            </div>
                            <div class="column is-hidden-touch">
                                <strong>Ausgeführt von</strong>
                            </div>
                        </div>
                    </div>
                    <template>
                        <div class="columns is-mobile">
                            <div class="column is-1">
                                <input value="{{id}}" type="checkbox">
                            </div>
                            <div class="column is-1-desktop is-3-mobile">
                                {{updatedAt|date}}
                            </div>
                            <div class="column">
                                {{values.Diagnose}}
                            </div>
                            <div class="column">
                                {{values.Behandlung}}
                            </div>
                            <div class="column is-hidden-touch">
                                {{values.EmpfohleneMaßnahme}}
                            </div>
                            <div class="column is-hidden-touch">
                                {{lastVet.userName}}
                            </div>
                        </div>
                        <hr style="margin:0px;" />
                    </template>
                </opplan-table>
            </div>
                <div class="container sticky-footer">
                    <div class="columns is-mobile">
                        <div class="column">
                            <input id="abortButton" 
                                    class="button is-danger is-fullwidth" 
                                    type="reset" value="Abbrechen">                   
                        </div>
                        <div class="column">
                            <input id="takeoverButton" disabled
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
    protected get paramKey(): string {
        return "selectPageMeasure.return";
    }

    connectedCallback() {
        super.connectedCallback();

        let list: VetproviehList = this.vetproviehList;
        if (list) {
            list.repository = this.repository;
            list.addEventListener("selected", () => {
                this.updateSelectedAmount();
            })
        }

        let list2: VetproviehList = this.objectivesList;
        if (list2) {
            list2.addEventListener("selected", () => {
                this.updateSelectedAmount();
            })
        }


        let tabs = this.querySelector(".tabs");

        if (tabs) {
            let anchors = tabs.querySelectorAll("a");
            anchors.forEach((element: HTMLAnchorElement) => {
                element.addEventListener("click", () => {
                    let id = element.dataset.id;

                    anchors.forEach((a) => {
                        a.parentElement?.classList.remove("is-active");
                    });

                    element.parentElement?.classList.add("is-active");

                    [this.querySelector("#measures"), this.querySelector("#opplans")].forEach((content) => {
                        if (content?.id == id) {
                            content?.classList.remove("is-hidden");
                        } else if (content) {
                            content?.classList.add("is-hidden");
                        }
                    })
                })
            })
        }
    }

    /**
     * Return Value
     * @return {any}
     */
    protected get returnValue(): any {
        return this.selectedOperationPlans.concat(this.selectedCurrentObjectives);
    }

    /**
     * Loading Liste von Operation-Plan
     * @return {VetproviehList}
     */
    private get vetproviehList(): VetproviehList {
        return document.getElementById("measuresList") as VetproviehList;
    }

    /**
    * Loading Liste von Operation-Plan
    * @return {VetproviehList}
    */
    private get objectivesList(): VetproviehList {
        return document.getElementById("objectivesList") as VetproviehList;
    }

    /**
     * Get selected OperationPlans
     * @return {Array<Objective | undefined>}
     */
    public get selectedOperationPlans(): Array<Objective | undefined> {
        return this.operationPlans
            .filter((operationPlan: PlanMeasureModel) => !!operationPlan.id && operationPlan.values && this.selectedOperationPlanIds.includes(+operationPlan.id))
            .map((part: PlanMeasureModel) => this.opPlanToObjective(part));
    }

    /**
     * Transform Opplan to Objective
     * @param {PlanMeasureModel} part 
     * @returns {Objective | undefined}
     */
    private opPlanToObjective(part: PlanMeasureModel): Objective | undefined {
        if (part.values) {
            let tokenMeasure = part.values.EmpfohleneMaßnahme;
            let objective = new Objective();
            objective.name = `Maßnahmen aus ${part.name} vom ${ObjectHelper.formatDate(part.updatedAt)}`;
            objective.keyResults = [];
            tokenMeasure.split("\r\n").forEach((measureLine: string) => {
                let keyResult = new KeyResult();
                keyResult.name = measureLine;
                objective.keyResults.push(keyResult);
            })
            return objective;
        } else {
            return undefined;
        }
    }

    /**
    * Get selected OperationPlans
    * @return {Array<Objective>}
    */
    public get selectedCurrentObjectives(): Array<Objective> {
        return this.objectives
            .filter((objective: Objective) => !!objective.id && this.selectedObjectivesIds.includes(+objective.id));
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
    * Get selected objectiveIds
    * @return {Array<number>} 
    */
    public get selectedObjectivesIds(): Array<number> {
        let inputCheckboxes = this.objectivesList.shadowRoot?.querySelectorAll("input[type='checkbox']");
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
     * @return {Array<PlanMeasureModel>}
     */
    public get operationPlans(): Array<PlanMeasureModel> {
        return this.vetproviehList?.objects || [];
    }

    /**
    * Get All visible Objectives
    * @return {Array<Objective>}
    */
    public get objectives(): Array<Objective> {
        return this.objectivesList?.objects || [];
    }


    /**
     * Updating Tab Element Selected Amount
     */
    private updateSelectedAmount() {
        let selectedAmount = this.selectedOperationPlanIds.length;
        selectedAmount += this.selectedObjectivesIds.length;

        // Activate takeover Button
        this.takeoverButton.disabled = selectedAmount == 0;

        // Updating amount in Tab
        let span = this.selectedObjectives;
        if (span) span.textContent = selectedAmount.toString();
    }

    /**
     * Badge Amount in Tab-Header
     * @return {HTMLSpanElement}
     */
    private get selectedObjectives(): HTMLSpanElement {
        return document.getElementById("selectedObjectives") as HTMLSpanElement;
    }
}