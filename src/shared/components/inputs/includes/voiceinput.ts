import {SpeechWrapper} from '../../speechAssistant';

/** *
 * Exentsion for Input to Achieve Voice-Input
 */
export class VoiceInput extends HTMLTextAreaElement {
  private _speechWrapper = new SpeechWrapper(true);
  private _started = false;
  private _overwrite = false;
  private _startValue = '';

  /**
   * Default-Constructor
   */
  constructor() {
    super();
  }


  /**
   * Connected Callback
   */
  public connectedCallback() {
    if (this._speechWrapper.ready) {
      this._addVoiceInputButton();


      const onResultFunc = (result: any) => {
        if (this._overwrite) {
          this.value = result[0].transcript;
        } else {
          this.value = this._startValue + result[0].transcript;
        }
        this.dispatchEvent(new Event('change'));
        this.dispatchEvent(new Event('keyup'));
      };
      onResultFunc.bind(this);
      this._speechWrapper.onresultRaw = onResultFunc;
    }
  }

  /**
   * @private
   * Adding Voice-Input Button to Text-Field
   */
  private _addVoiceInputButton() {
    const button: HTMLButtonElement = this.buildButton();
    const buttonOverwrite: HTMLButtonElement = this.buildButton(['is-danger']);


    const buttonFunc = () => {
      this._started = !this._started;
      if (this._started) {
        button.classList.add('is-primary');
        buttonOverwrite.disabled = true;
        this._overwrite = false;
        this._startValue = this.value;
        this._speechWrapper.start();
      } else {
        button.classList.remove('is-primary');
        this._speechWrapper.stop();
        buttonOverwrite.disabled = false;
      }
    };

    const buttonOverwriteFunc = () => {
      this._started = !this._started;
      if (this._started) {
        buttonOverwrite.classList.add('is-primary');
        buttonOverwrite.classList.remove('is-danger');
        this._overwrite = true;
        button.disabled = false;
        button.disabled = true;
        this._speechWrapper.start();
      } else {
        buttonOverwrite.classList.remove('is-primary');
        buttonOverwrite.classList.add('is-danger');
        button.disabled = false;
        this._speechWrapper.stop();
      }
    };

    buttonFunc.bind(this);
    buttonOverwriteFunc.bind(this);

    this._speechWrapper.onresult = () => {
      button.classList.remove('is-primary');
      buttonOverwrite.classList.remove('is-primary');
    };

    button.addEventListener('click', buttonFunc);

    buttonOverwrite.addEventListener('click', buttonOverwriteFunc);

    this.appendButtons([button, buttonOverwrite]);
  }

  /**
   * Buttons anfügen
   * @param {HTMLButtonElement[]} buttons
   */
  private appendButtons(buttons: HTMLButtonElement[]) {
    const div = document.createElement('div');
    div.classList.add('control');

    buttons.forEach((button) => {
      div.appendChild(button);
    });

    const grandParent = this.parentElement?.parentElement;
    this.parentElement?.classList.add('is-expanded');
    grandParent?.classList.add('has-addons');
    grandParent?.appendChild(div);
  }

  /**
   * Building Button to Click
   * @param {string[]} additionalClasses
   * @return {HTMLButtonElement}
   */
  private buildButton(additionalClasses: string[] = []): HTMLButtonElement {
    const button: HTMLButtonElement = document.createElement('button');
    button.innerHTML = `<i class="fas fa-microphone-alt" aria-hidden="true" />`;
    button.type = 'button';

    button.classList.add('button');

    additionalClasses.forEach((clazz) => {
      button.classList.add(clazz);
    });
    return button;
  }
}


customElements.define('voice-input', VoiceInput, {
  extends: 'textarea',
});
