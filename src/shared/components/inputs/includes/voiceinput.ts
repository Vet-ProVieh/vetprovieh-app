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


      const self = this;
      this._speechWrapper.onresultRaw = (result: any) => {
        if (this._overwrite) {
          self.value = result[0].transcript;
        } else {
          self.value = self._startValue + result[0].transcript;
        }
        self.dispatchEvent(new Event('change'));
        self.dispatchEvent(new Event('keyup'));
      };
    }
  }

  /**
   * @private
   * Adding Voice-Input Button to Text-Field
   */
  private _addVoiceInputButton() {
    const button: HTMLButtonElement = this.buildButton();
    const buttonOverwrite: HTMLButtonElement = this.buildButton(['is-danger']);

    const _self = this;

    this._speechWrapper.onresult = (result: any) => {
      console.log(result);
      button.classList.remove('is-primary');
      buttonOverwrite.classList.remove('is-primary');
    };

    button.addEventListener('click', () => {
      _self._started = !_self._started;
      if (_self._started) {
        button.classList.add('is-primary');
        buttonOverwrite.disabled = true;
        _self._overwrite = false;
        _self._startValue = _self.value;
        _self._speechWrapper.start();
      } else {
        button.classList.remove('is-primary');
        _self._speechWrapper.stop();
        buttonOverwrite.disabled = false;
      }
    });

    buttonOverwrite.addEventListener('click', () => {
      _self._started = !_self._started;
      if (_self._started) {
        buttonOverwrite.classList.add('is-primary');
        buttonOverwrite.classList.remove('is-danger');
        _self._overwrite = true;
        button.disabled = false;
        button.disabled = true;
        _self._speechWrapper.start();
      } else {
        buttonOverwrite.classList.remove('is-primary');
        buttonOverwrite.classList.add('is-danger');
        button.disabled = false;
        _self._speechWrapper.stop();
      }
    });

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
