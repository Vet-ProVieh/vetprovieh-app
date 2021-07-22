import { VetproviehElement, VetproviehNavParams, WebComponent } from "@tomuench/vetprovieh-shared/lib";
import { Objective } from "../../../../measures";
import { KeyResult } from "../../../../measures/models/keyresult";
import { SimpleModal } from "./simple-modal";

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
            <div class="field">
                <label class="label">Bezeichnung der Maßnahme</label>
                    <div class="control">
                        <input class="input" type="text" placeholder="" id="objectiveName">
                </div>
            </div>
            <div class="field">
                <label class="label">Durchzuführen bis:</label>
                    <div class="control">
                        <input class="input" type="date" placeholder="" id="objectiveDate">
                </div>
            </div>
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
            <button class="button is-primary" id="save">
                <span class="icon"><i class="far fa-save"></i></span>
                <span>Maßnahme hinzufügen</span>
            </button>
        </p>
        <p class="control">
            <button class="button is-danger" id="cancel">
                <span class="icon"><i class="fas fa-trash-alt"></i></span>
                <span>Maßnahme verwerfen</span>
            </button>
        </p>
          </div>
        </footer>
        </div>
    </div>`
})
export class ObjectiveModal extends SimpleModal {

    public static NAVIGATION_KEY :string = "NewObjective";

    private _objective:Objective = new Objective();



    connectedCallback(){
        this.title = "Neue Maßnahme hinzufügen";
        this.render();

        let btnSave = this.shadowRoot?.getElementById("save") as HTMLButtonElement;
        btnSave.addEventListener("click", () => {
            this._objective.name = (this.shadowRoot?.getElementById("objectiveName") as HTMLInputElement).value;
            this._objective.date = (this.shadowRoot?.getElementById("objectiveDate") as HTMLInputElement).value;
            this._objective.keyResults = this.getKeyResults();
            // VetproviehNavParams.set(ObjectiveModal.NAVIGATION_KEY, this._objective);
            this.dispatchEvent(new CustomEvent("save", {detail: this._objective}));
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

    private getKeyResults(){
        let keyResults:KeyResult[] = []
        let elems = this.keyResults;
        let pos = 0;
        for(let i=0; i<elems.childNodes.length; i++){ 
            if(elems.childNodes[i].nodeName == "INPUT" && (elems.childNodes[i] as HTMLInputElement).value != ""){
                let kr = new KeyResult();
                kr.name = (elems.childNodes[i] as HTMLInputElement).value;
                kr.position = pos;
                pos++;
                keyResults.push(kr);
            }
        }
        return keyResults;
    }

    private get keyResults(){
        return this.shadowRoot?.getElementById("keyResults") as HTMLElement;
    }

}