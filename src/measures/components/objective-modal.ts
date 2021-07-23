import { VetproviehBinding, VetproviehElement, WebComponent } from "@tomuench/vetprovieh-shared/lib";
import { SimpleModal } from "../../shared";
import { Objective } from "../models";
import { KeyResult } from "../models/keyresult";

@WebComponent({
    tag: "objective-modal",
    template: VetproviehElement.template + `
    <div id="modal" class="modal">
        <div class="modal-background"></div>
        <div class="modal-card">
        <header class="modal-card-head">
            <p class="modal-card-title">\${this.title}</p>
            <button id="closeButton" class="delete" aria-label="close"></button>
        </header>
        <section class="modal-card-body">
            <bulma-input property="name" label="Bezeichnung der Maßnahme">
            </bulma-input>
            
            <bulma-input-checkbox property="welfare" label="Tierwohl?"></bulma-input-checkbox>

            <bulma-input property="name" type="date" property="date" label="Durchzuführen bis">
            </bulma-input>

            <div class="field">
                    <label class="label">Zwischenziele:</label>
                    <div class="control" id="keyResults">
                        <input class="input" type="text" placeholder="">
                        
                    </div>
                    <div class="columns is-gapless">
                        <div class="column" style="text-align: right;">
                            
                            <button class="button is-success" id="addKeyResult">
                                <i class="fas fa-plus"></i>
                            </button>
                        </div>
                        <div class="column" style="text-align: left;">
                            <button class="button is-danger" id="deleteKeyResult">
                                <i class="fas fa-trash-alt"></i>
                            </button>
                        </div>
                    </div>
                    
            </div>
        </section>
        <footer class="modal-card-foot"> 
        <div class="field is-grouped">
            <p class="control">
                <button class="button is-danger" id="cancel">
                    <span class="icon"><i class="fas fa-trash-alt"></i></span>
                    <span>Abbrechen</span>
                </button>
            </p>
            <p class="control">
                <button class="button is-primary" id="save">
                    <span class="icon"><i class="far fa-save"></i></span>
                    <span>Übernehmen</span>
                </button>
            </p>
          </div>
        </footer>
        </div>
    </div>`
})
export class ObjectiveModal extends SimpleModal {

    constructor() {
        super();
        this.title = "Neue Maßnahme hinzufügen";
    }


    // @ts-ignore
    private _objective: Objective; 

    public set objective(v: Objective) {
        if(this._objective !== v){
            this._objective = v;
            VetproviehBinding.bindFormElements(this.shadowRoot, this._objective);
        }
    }

    public get objective(): Objective {
        return this._objective;
    }

    connectedCallback() {
        this.render();
        this.objective = new Objective();

        let btnSave = this.shadowRoot?.getElementById("save") as HTMLButtonElement;
        btnSave.addEventListener("click", () => {
            this._objective.keyResults = this.getKeyResults();
            this.dispatchEvent(new CustomEvent("save", { detail: this._objective }));
            this.close();
        });

        let addKeyResult = this.shadowRoot?.getElementById("addKeyResult") as HTMLButtonElement;
        addKeyResult.addEventListener("click", () => {
            
            let elems = this.keyResults;
            let input = document.createElement("input");
            input.setAttribute("type", "text");
            input.setAttribute("class", "input");
            elems.appendChild(input);
        });

        let deleteKeyResult = this.shadowRoot?.getElementById("deleteKeyResult") as HTMLButtonElement;
        deleteKeyResult.addEventListener("click", () => {
            let elems = this.keyResults;
            elems.removeChild(elems.lastChild as Node);
        });

        (this.shadowRoot?.getElementById("cancel") as HTMLButtonElement).addEventListener("click", () => {
            this.close();
        });

        (this.shadowRoot?.getElementById("closeButton") as HTMLButtonElement).addEventListener("click", () => {
            this.close();
        });
    }

    private getKeyResults() {
        let keyResults: KeyResult[] = []
        let pos = 0;
        this.keyResults.childNodes.forEach((node) => {
            if (node.nodeName == "INPUT" && (node as HTMLInputElement).value != "") {
                let kr = new KeyResult();
                kr.name = (node as HTMLInputElement).value;
                kr.position = pos;
                pos++;
                keyResults.push(kr);
            }
        });
        return keyResults;
    }

    private get keyResults() {
        return this.shadowRoot?.getElementById("keyResults") as HTMLElement;
    }

}