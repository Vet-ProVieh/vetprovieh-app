import { VetproviehElement, WebComponent } from "@tomuench/vetprovieh-shared/lib";
import { FieldMarker } from "./fieldMarker";
import { ResponseInterpreter } from "./responseInterpreter";
import { SpeechWrapper } from "./speechWraper";

@WebComponent({
    template:
        VetproviehElement.template + `
    <article class="panel">
        <div class="panel-block">
            <button id="speechButton" class="button is-primary is-link is-fullwidth" type="button">
                <i class="fas fa-microphone-alt"></i> Sprachassistent
            </button>
        </div>
    </article>
    `,
    tag: 'vetprovieh-assistant'
})
export class SpeechAssistant extends VetproviehElement {

    private fieldMarker: FieldMarker = new FieldMarker();
    private responseInterpreter: ResponseInterpreter | undefined;
    private speechWrapper = new SpeechWrapper(true);

    private _active: boolean = false;

    connectedCallback() {
        super.connectedCallback();
        this.responseInterpreter = new ResponseInterpreter(this.speechWrapper);
        this.registerSpeechButtonListener();
        this.responseInterpreter.onMarkField = this.fieldMarker.markField;
    }

    public activate() {
        this.setGrammar();
    }

    private setGrammar() {
        let inputFields = (document.getElementById("detail") as VetproviehElement).shadowRoot?.querySelectorAll("textarea, input");
        let fieldNames : string[] = [];
        if (inputFields) {
            inputFields.forEach((field: any) => {
                if(field.name){
                    fieldNames.push(field.name);
                }
            })
        }
        let grammar = `#JSGF V1.0;grammar command;<fieldname> = ${fieldNames.join(" | ")};`
        grammar += `public <command> = <fieldname>: * weiter;`
        this.speechWrapper.addGrammar(grammar);
    }

    private registerSpeechButtonListener() {
        let func = () => {
            this.toggleButton();
        }

        func.bind(this);

        this.speechButton.addEventListener("click", func)
    }

    public set active(v: boolean) {
        if (v !== this._active) {
            this._active = v;
            if (v) {
                this.speechButton.classList.add("is-danger");
            } else {
                this.speechButton.classList.remove("is-danger");
            }
        }
    }


    private toggleButton() {
        if (this._active) {
            this.stopRecognition();
        } else {
            this.startRecognition();
        }
        this.active = !this._active;
    }

    private startRecognition() {
        this.speechWrapper.start();
    }

    private stopRecognition() {
        this.speechWrapper.stop();
    }

    /**
     * Getting Speech-Button
     * @return [HTMLButtonElement]
     */
    private get speechButton(): HTMLButtonElement {
        return this.getByIdFromShadowRoot("speechButton") as HTMLButtonElement
    }

}