import { VetproviehElement, WebComponent } from "@tomuench/vetprovieh-shared/lib";
import { SimpleModal } from "./simple-modal";


@WebComponent({
    tag: "question-modal",
    template: VetproviehElement.template + `
    <div id="modal" class="modal">
        <div class="modal-background"></div>
        <div class="modal-card">
        <header class="modal-card-head">
            <p class="modal-card-title">\${this.title}</p>
        </header>
        <section class="modal-card-body">
            <p>\${this.message}</p>
        </section>
        <footer class="modal-card-foot"> 
        <div class="field is-grouped">
            <p class="control">
                <button class="button is-danger" id="closeButton">
                    <span>Ablehen</span>
                </button>
            </p>
            <p class="control">
                <button class="button is-primary" id="save">
                    <span>Bestätigen</span>
                </button>
            </p>
          </div>
        </footer>
        </div>
    </div>`
})
export class QuestionModal extends SimpleModal {
    private _message: string = "";

    private _result: boolean = false;

    public get result(): boolean {
        return this._result;
    }

    public get message(): string {
        return this._message;
    }

    public set message(v: string) {
        if(v !== this._message) {
            this._message = v;
        }
    }

    constructor(title: string, message: string) {
        super();
        this.message = message;
        this.title = title;
    }

    connectedCallback() {
        super.connectedCallback();
    }

    protected addButtonListeners() {
        this.saveButton.addEventListener("click", (event) => {
            this._result = true;
            this.close();
        });
    }


    /**
     * Open QuestionModal and Ask Message
     * @param {string} title
     * @param {string} message 
     */
    public static askQuestion(title: string, message: string): Promise<boolean> {
        return new Promise<boolean>((resolve, reject) => {
            let modal = new QuestionModal(title, message);
            modal.render();
            document.children[0].append(modal);
            modal.active = true;
            modal.addEventListener("close", () => {
                resolve(modal.result);
                modal.remove();
            });
        })
    }


    /**
     * Observed Attributes
     */
     static get observedAttributes() {
        return ['type', 'title', 'message'];
    }
}