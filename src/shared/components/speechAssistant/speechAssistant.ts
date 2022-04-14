import {VetproviehElement, WebComponent} from '@tomuench/vetprovieh-shared/lib';
import {FieldMarker} from './fieldMarker';
import {ResponseInterpreter} from './responseInterpreter';
import {SpeechWrapper} from './speechWraper';

// eslint-disable-next-line new-cap
@WebComponent({
  template:
        VetproviehElement.template + `
    <article class="panel">
        <div class="panel-block">
            <button id="speechButton"
            class="button is-primary is-link is-fullwidth" type="button">
                <i class="fas fa-microphone-alt"
                   aria-hidden="true"></i>
                   Sprachassistent
            </button>
        </div>
    </article>
    `,
  tag: 'vetprovieh-assistant',
})
/**
 * Speech-Assistant Web-Component
 */
export class SpeechAssistant extends VetproviehElement {
    private fieldMarker: FieldMarker = new FieldMarker();
    private responseInterpreter: ResponseInterpreter | undefined;
    private speechWrapper = new SpeechWrapper(true);

    private _active = false;

    /**
     * Connected-Callback (Web-component)
     */
    connectedCallback() {
      super.connectedCallback();
      this.responseInterpreter = new ResponseInterpreter(this.speechWrapper);
      this.registerSpeechButtonListener();
      this.responseInterpreter.onMarkField = this.fieldMarker.markField;
    }

    /**
     * Activate component
     */
    public activate() {
      this.setGrammar();
    }

    /**
     * Loading Input-Fields from Detail
     * @return {NodeListOf<any> | undefined}
     */
    private loadInputFields() : NodeListOf<any> | undefined {
      const detail : VetproviehElement = document
          .getElementById('detail') as VetproviehElement;
      return detail?.shadowRoot?.querySelectorAll('textarea, input');
    }

    /**
     * Setting Grammer
     */
    private setGrammar() {
      const inputFields = this.loadInputFields();
      const fieldNames : string[] = [];
      if (inputFields) {
        inputFields.forEach((field: any) => {
          if (field.name) {
            fieldNames.push(field.name);
          }
        });
      }
      let grammar = `#JSGF V1.0;grammar command;`;
      grammar += `<fieldname> = ${fieldNames.join(' | ')};`;
      grammar += `public <command> = <fieldname>: * weiter;`;
      this.speechWrapper.addGrammar(grammar);
    }

    /**
     * Registering Speech-Button-listener
     */
    private registerSpeechButtonListener() {
      const func = () => {
        this.toggleButton();
      };

      func.bind(this);

      this.speechButton.addEventListener('click', func);
    }

    /**
     * Activating
     * @param {boolean} v
     */
    public set active(v: boolean) {
      if (v !== this._active) {
        this._active = v;
        if (v) {
          this.speechButton.classList.add('is-danger');
        } else {
          this.speechButton.classList.remove('is-danger');
        }
      }
    }

    /**
     * Toggeling Button of Speech-Asssitant
     */
    private toggleButton() {
      if (this._active) {
        this.stopRecognition();
      } else {
        this.startRecognition();
      }
      this.active = !this._active;
    }

    /**
     * Starting Speech-Recognition
     */
    private startRecognition() {
      this.speechWrapper.start();
    }

    /**
     * Stop Speech-Recognition
     */
    private stopRecognition() {
      this.speechWrapper.stop();
    }

    /**
     * Getting Speech-Button
     * @return {HTMLButtonElement}
     */
    private get speechButton(): HTMLButtonElement {
      return this.getByIdFromShadowRoot('speechButton') as HTMLButtonElement;
    }
}
