
import { WebComponent, VetproviehElement } from "@tomuench/vetprovieh-shared/lib";
import { ObjectiveModal } from "./objective-modal";
import { KeyResult } from "../models/keyresult";
import { Objective } from "../models/objective";
import { KeyResultComponent } from "./keyResult";
import { QuestionModal, StarsComponent } from "../../shared";

/**
 * Controller for Page
 * pages/operations/plans/create or edit
 */
@WebComponent({
    template:
        VetproviehElement.template +
        ` 
    <style>
        .dropdown {
            position: relative;
            display: block;
        }

        .dropdown-content {
            position: relative;
            background-color: #f9f9f9;
            min-width: 160px;
            box-shadow: 0px 8px 16px 0px rgba(0,0,0,0.2);
            padding: 12px 16px;
            z-index: 1;
        }

        #btn-dropdown {
            cursor: pointer;
        }

        
    </style>

    <objective-modal id="modal"></objective-modal>
    <div class="columns is-centered">
        <div class="column is-two-thirds is-centered">
            <div class="card dropdown">
                <header class="card-header">
                    <p class="card-header-title">
                        \${this.objective.name}
                    </p>
                    <p class="card-header-title">
                        <vp-stars amount="5" id="stars">
                        </vp-stars>
                    </p>
                    <p class="card-header-title">
                        Bis:&nbsp;&nbsp; \${ObjectHelper.formatDate(this.objective.date)}
                    </p>
                    <p class="card-header-icon" id="btn-dropdown" aria-label="more options">
                        <span class="icon">
                            <i class="fas fa-angle-down" aria-hidden="true" id="arrow"></i>
                        </span>
                    </p>
                </header>
                <div id="content" class="card-content dropdown-content is-hidden">
                    <div class="content" id="keyResults">
                    </div>
                    <div class="columns">
                        <div class="column">
                            <button id="deleteButton" class="button is-danger is-fullwidth">
                                <i class="fas fa-trash-alt"></i>
                            </button>
                        </div>
                        <div class="column">
                            <button id="editButton" class="button is-info is-fullwidth">
                                <i class="fas fa-edit"></i>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    `,
    tag: "vp-objective-item",
})
export class ObjectiveItemComponent extends VetproviehElement {

    private _objective: Objective = new Objective();

    /**
     * @property {Objective}
     */
    public get objective(): Objective {
        return this._objective;
    }

    public set objective(val: Objective) {
        if (this._objective !== val) {
            this._objective = val;
            this.render();
        }
    }

    connectedCallback(){
        let stars = this.getByIdFromShadowRoot("stars") as StarsComponent;
       // this.objective.rating = stars.score;
        stars.score = this.objective.rating;
        stars.addEventListener("click", () => {
            this.objective.rating = stars.score;
        })
    } 

    public render() {
        super.render();
        this.renderKeyResults();

        let btn = this.shadowRoot?.getElementById("btn-dropdown") as HTMLElement;
        btn.addEventListener("click", () => this.toggleDetails());

        this.registerDeleteButton();
        this.registerEditButton();
        this.configureModal();
    }

    /**
     * Render KeyResults
     */
    private renderKeyResults() {
        let container = this.keyResultsContainer();
        container.innerHTML = "";
        this.objective.keyResults.forEach((keyResult) => {
            this.addKeyResult(keyResult);
        })
    }

    private addKeyResult(keyResult: KeyResult) {
        let container = this.keyResultsContainer();
        let keyResultItem = new KeyResultComponent();
        keyResultItem.keyResult = keyResult;
        container.appendChild(keyResultItem);
    }


    constructor() {
        super(true, false);
    }

    private registerDeleteButton() {
        this.deleteButton.addEventListener("click", () => {
            QuestionModal.askQuestion("Sind Sie sicher?", "Möchten Sie die Maßnahme entfernen?").then((result) => {
                console.log(result);
                if (result) {
                    this.dispatchEvent(new CustomEvent("delete", {detail: this.objective}));
                }
            })
        });
    }

    private registerEditButton() {
        this.editButton.addEventListener("click", () => {
            this.objectivesModal.objective = this._objective;
            this.objectivesModal.active = true;
        });
    }

    /**
     * Toggle-Details for ObjectiveItem
     */
    private toggleDetails() {
        let cardBody = this.contentContainer;
        let arrow = this.shadowRoot?.getElementById("arrow") as HTMLElement;

        if (cardBody.classList.contains("is-hidden")) {
            cardBody.classList.remove("is-hidden");
            arrow.style.transform = "rotate(180deg)";
        } else {
            cardBody.classList.add("is-hidden")
            arrow.style.transform = "rotate(0deg)";
        }
    }

    /**
     * Getting Content-Container
     * @return {HTMLElement}
     */
    private get contentContainer(): HTMLElement {
        return this.shadowRoot?.getElementById("content") as HTMLElement;
    }

    private keyResultsContainer() {
        return this.shadowRoot?.getElementById("keyResults") as HTMLElement;
    }


    /**
     * Load Delete-Button from DOM
     * @return {HTMLButtonElement}
     */
    private get deleteButton(): HTMLButtonElement {
        return this.shadowRoot?.getElementById("deleteButton") as HTMLButtonElement;
    }

    /**
     * Load Edit-Button from DOM
     * @return {HTMLButtonElement}
     */
    private get editButton(): HTMLButtonElement {
        return this.shadowRoot?.getElementById("editButton") as HTMLButtonElement;
    }

    /**
     * Get Objectives-Modal-DOM-Element
     * @returns {ObjectiveModal}
     */
    private get objectivesModal(): ObjectiveModal {
        return this.shadowRoot?.getElementById("modal") as ObjectiveModal;
    }


    /**
     * Configuring Callback from Modal
     */
    private configureModal() {
        this.objectivesModal.addEventListener("save", (event: Event) => {
            console.log(event);
            this.render();
        });
    }

}
