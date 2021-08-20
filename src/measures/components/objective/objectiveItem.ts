
import { WebComponent, VetproviehElement, ObjectHelper, ViewHelper } from "@tomuench/vetprovieh-shared/lib";
import { ObjectiveModal } from "./objective-modal";
import { Objective, KeyResult } from "../../models/";
import { KeyResultComponent } from "./keyResult";
import { QuestionModal, StarsComponent } from "../../../shared";

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
                        <vp-stars amount="5" id="stars" class="\${this.cssHidden(this.valuation != 'true')}">
                        </vp-stars>
                    </p>
                    <p class="card-header-title">
                        Bis:&nbsp;&nbsp; \${this.formatDate(this.objective.date)}
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
                    <div id="buttonsRow" class="columns is-mobile \${this.cssHidden(this.editable != 'true')}">
                        <div class="column">
                            <button id="deleteButton" class="button is-danger is-light is-fullwidth 
                                \${this.cssHidden(this.editable != 'true')}">
                                <i class="fas fa-trash-alt"></i>
                                <span> Entfernen</span>
                            </button>
                        </div>
                        <div class="column">
                            <button id="editButton" class="button is-info is-light is-fullwidth
                                \${this.cssHidden(this.editable != 'true')}">
                                <i class="fas fa-edit"></i>
                                <span> Bearbeiten</span>
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
    private _valuation: boolean = false;
    private _editable: boolean = false;

    /**
     * Show editable Buttons or not
     * @property {string} editable
     */
    public get editable(): string {
        return this._editable.toString();
    }
    public set editable(v: string) {
        let vAsBool = ObjectHelper.stringToBool(v);
        if (this._editable !== vAsBool) {
            this._editable = vAsBool;
            this.toggleEditableFields();
        }
    }

    /**
     * Toggle Editable fields
     */
    private toggleEditableFields() {
        let elements = [this.deleteButton, this.editButton, this.shadowRoot?.querySelector("#buttonsRow")];
        elements.forEach((element) => {
            if(element){
                ViewHelper.toggleVisibility(element as HTMLElement, this._editable);
            }
        })

        this.shadowRoot?.querySelectorAll("vp-key-result").forEach((keyResult) => {
            let e = keyResult as KeyResultComponent;
            e.editable = this.editable;
        })
    }

    /**
     * Toggle Rating Component
     */
    private toggleValuationFields() {
        if(this.ratingComponent){
            ViewHelper.toggleVisibility(this.ratingComponent, this._valuation);
        }
    }


    /**
     * Show Valuation Items or not
     * @property {string} valuation
     */
    public get valuation(): string {
        return this._valuation.toString();
    }

    public set valuation(v: string) {
        let vAsBool = ObjectHelper.stringToBool(v);
        if (this._valuation !== vAsBool) {
            this._valuation = vAsBool;
            this.toggleValuationFields();
        }
    }

    public formatDate(v: string): string {
        return ObjectHelper.formatDate(v);
    }

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

    connectedCallback() {
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
        keyResultItem.editable = this.editable;
        container.appendChild(keyResultItem);
    }


    constructor() {
        super(true, false);
    }

    /**
     * Load Rating Component
     * @return {StarsComponent}
     */
    private get ratingComponent() : StarsComponent {
        return this.getByIdFromShadowRoot("stars") as StarsComponent;
    }

    private registerDeleteButton() {
        this.deleteButton.addEventListener("click", () => {
            QuestionModal.askQuestion("Sind Sie sicher?", "Möchten Sie die Maßnahme entfernen?").then((result) => {
                console.log(result);
                if (result) {
                    this.dispatchEvent(new CustomEvent("delete", { detail: this.objective }));
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

        let show = cardBody.classList.contains("is-hidden");
        ViewHelper.toggleVisibility(cardBody, show);
        arrow.style.transform = `rotate(${show ? 180 : 0}deg)`;
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

    static get observedAttributes() {
        return ["valuation"];
    }
}
