import { VetproviehBinding, VetproviehElement, WebComponent } from "@tomuench/vetprovieh-shared/lib";
import { SimpleModal } from "../../../shared";
import { Objective, KeyResult } from "../../models";
import {  } from "../../models/keyresult";
import { KeyResultEditComponent } from "./keyResultEdit";

@WebComponent({
    tag: "objective-modal",
    template: VetproviehElement.template + `
    <div id="modal" class="modal">
        <div class="modal-background"></div>
        <div class="modal-card">
        <header class="modal-card-head">
            <p class="modal-card-title">Maßnahme bearbeiten</p>
            <button id="closeButton" class="delete" aria-label="close"></button>
        </header>
        <section class="modal-card-body">
            <form id="form">
                <div id="objective">
                    <bulma-input property="name" label="Bezeichnung der Maßnahme" required>
                    </bulma-input>
                    
                    <bulma-input-checkbox property="welfare" label="Tierwohl?"></bulma-input-checkbox>

                    <bulma-input type="date" property="date" label="Durchzuführen bis" required>
                    </bulma-input>
                </div>
                <hr/>
                <div class="field">
                        <label class="label">Zwischenziele:</label>
                        <div class="control" id="keyResults">                        
                        </div>
                        <hr/>
                        <div>
                            <div class="button is-success" id="addKeyResult">
                                <i class="fas fa-plus"></i>
                                <span>Neues Zwischenziel hinzufügen</span>
                            </div>
                        </div>
                        
                </div>
            </form>
        </section>
        <footer class="modal-card-foot"> 

            <div class="container">
                <div class="columns is-mobile">
                    <div class="column">
                        <button class="button is-danger is-fullwidth" id="cancel">
                            <span class="icon"><i class="fas fa-trash-alt"></i></span>
                            <span>Abbrechen</span>
                        </button>
                    </div>
                    <div class="column">
                        <button class="button is-primary is-fullwidth" id="save">
                            <span class="icon"><i class="fas fa-save"></i></span>
                            <span>Übernehmen</span>
                        </button>
                    </div>
                </div>
            </div>
        </footer>
        </div>
    </div>`
})
export class ObjectiveModal extends SimpleModal {

    constructor() {
        super();
    }


    // @ts-ignore
    private _objective: Objective;

    public set objective(v: Objective) {
        if (this._objective !== v) {
            this._objective = v;
            VetproviehBinding.bindFormElements(this.getByIdFromShadowRoot("objective"), this._objective);
            this.renderKeyResults();
        }
    }

    public get objective(): Objective {
        return this._objective;
    }

    /**
     * Rendering KeyResults to KeyResultEditComponent
     */
    private renderKeyResults() {
        this.keyResults.innerHTML = "";
        this.objective.keyResults.forEach((keyResult) => {
            this.appendKeyResult(keyResult);
        });
    }

    /**
     * Adding KeyResult to Dom and bind Listener
     * @param {KeyResult} keyResult 
     */
    private appendKeyResult(keyResult: KeyResult) {
        let keyResultEdit = new KeyResultEditComponent();
        keyResultEdit.keyResult = keyResult;
        keyResultEdit.addEventListener("delete", (e: Event) => {
            let obj = (e as CustomEvent).detail as KeyResult;
            let index = this.objective.keyResults.indexOf(obj);
            this.objective.keyResults.splice(index, 1);
        })
        this.keyResults.append(keyResultEdit);
    }

    protected addButtonListeners() {
        let btnSave = this.shadowRoot?.getElementById("save") as HTMLButtonElement;
        btnSave.addEventListener("click", () => {
            console.log(this.objective);
            if(this.validateInputs()){

                this.dispatchEvent(new CustomEvent("save", { detail: this._objective }));
                this.close();
            }
        });

        let addKeyResult = this.shadowRoot?.getElementById("addKeyResult") as HTMLElement;
        addKeyResult.addEventListener("click", () => {
            let keyResult = new KeyResult();
            this.objective.keyResults.push(keyResult);
            this.appendKeyResult(keyResult);
        });

        (this.shadowRoot?.getElementById("cancel") as HTMLButtonElement).addEventListener("click", () => {
            this.close();
        });
    }

    //Return True if Inputs are valid - return false and render Inputs in red if invalid
    private validateInputs(){
        let form = this.getByIdFromShadowRoot("form") as HTMLFormElement;

        let validityOfKeyResults = this.checkValidityOfKeyResults();
        if(form.checkValidity() && validityOfKeyResults){
            return true;
        }else{
            let invalid = form.querySelectorAll(':invalid');
            let valid = form.querySelectorAll(':valid');
            this.renderAsInvalid(invalid);
            this.renderAsValid(valid);
            return false;
        }
    }

    private checkValidityOfKeyResults(): boolean {
        let validity = true;
        this.shadowRoot?.querySelectorAll("vp-edit-key-result").forEach((e: any) => {
            validity = validity && (e as KeyResultEditComponent).checkVailidity();
        });
        return validity;
    }

    private renderAsInvalid(invalid: NodeListOf<Element>){
        invalid.forEach((elem)=>{
            (elem as HTMLInputElement).classList.add("is-danger");
        });
    }

    private renderAsValid(valid: NodeListOf<Element>){
        valid.forEach((elem)=>{
            (elem as HTMLInputElement).classList.remove("is-danger");
        });
    }

    connectedCallback() {
        super.connectedCallback();
        this.objective = new Objective();
    }

    /**
     * Get KeyResults-Container Dom Element
     * @return {HTMLElement}
     */
    private get keyResults() {
        return this.shadowRoot?.getElementById("keyResults") as HTMLElement;
    }

    static get observedAttributes() {
        return ["objective"];
    }
}