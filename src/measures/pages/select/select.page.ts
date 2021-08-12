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
                            <div class="column">
                                <strong>Diagnose</strong>
                            </div>
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


        let tabs = this.querySelector(".tabs");

        if (tabs) {
            console.log("tabs")
            let anchors = tabs.querySelectorAll("a");
            anchors.forEach((element: HTMLAnchorElement) => {
                element.addEventListener("click", () => {
                    console.log("CLIKED");
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

    /**
     * Updating Tab Element Selected Amount
     */
    private updateSelectedAmount() {
        let selectedAmount = this.selectedOperationPlanIds.length;

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