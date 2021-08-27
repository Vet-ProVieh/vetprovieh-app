import {SpeechWrapper} from '../../speechAssistant';

/** *
 * Exentsion for Input to Achieve Voice-Input
 */
export class VoiceInput extends HTMLTextAreaElement {
    private _speechWrapper = new SpeechWrapper();
    private _started = false;

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
          self.value = result[0].transcript;
          self.dispatchEvent(new Event('change'));
          self.dispatchEvent(new Event('keyup'));
        };
      }
    }

    /**
     * Adding Voice-Input Button to Text-Field
     */
    _addVoiceInputButton() {
      const button: HTMLButtonElement = document.createElement('button');
      button.innerHTML = `<i class="fas fa-microphone-alt"/>`;
      button.type = 'button';
      button.classList.add('button');
      const _self = this;

      button.addEventListener('click', (e) => {
        _self._started = !_self._started;
        if (_self._started) {
          button.classList.add('is-primary');
          _self._speechWrapper.start();
        } else {
          button.classList.remove('is-primary');
          _self._speechWrapper.stop();
        }
      });

      const div = document.createElement('div');
      div.classList.add('control');
      div.appendChild(button);

      const grandParent = this.parentElement?.parentElement;
        this.parentElement?.classList.add('is-expanded');
        grandParent?.classList.add('has-addons');
        grandParent?.appendChild(div);
    }
}

customElements.define('voice-input', VoiceInput, {
  extends: 'textarea',
});
