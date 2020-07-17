

/**
 * Wrapper for the Speech API
 */
class SpeechWrapper {
    private _recognition: any;
    private _speechRecognitionList: any;

    public get synth() {
        return window.speechSynthesis;
    }

    /**
     * Default-Constructor
     * @param element 
     */
    constructor() {
        this._initRecognition();
    }

    _initRecognition() {

        var SpeechRecognition = SpeechRecognition || webkitSpeechRecognition;
        var SpeechRecognitionEvent = SpeechRecognitionEvent || webkitSpeechRecognitionEvent;
        this._recognition = new SpeechRecognition();

        this._initGrammar();

        this._recognition.continuous = true;
        this._recognition.lang = 'de-DE';
        this._recognition.interimResults = false;
        this._recognition.maxAlternatives = 1;

        this._recognition.onnomatch = function (event) {
            console.log("I didn't recognise that color.");
        }.bind(this as SpeechWrapper);

        this._recognition.onerror = function (event) {
            console.log('Error occurred in recognition:');
            console.log(event);
        }
    }

    /**
     * Stop Speech Recognition
     */
    stop() {
        this._recognition.stop();
    }
    
    /**
     * Start Speech Recognition
     */
    start() {
        this._recognition.start();
    }

    set onresult(func: Function) {
        this._recognition.onresult  =  function (event) {
            console.log("HEARED SOMETHING");
            console.log(event);
            func(event.results[0][0].transcript);

        }.bind(this);
    }

    /**
     * Init Grammar for Speech Recognition
     */
    _initGrammar() {
        var grammar = '#JSGF V1.0; grammar colors;'
        var SpeechGrammarList: any = SpeechGrammarList || webkitSpeechGrammarList;
        this._speechRecognitionList = new SpeechGrammarList();
        this._speechRecognitionList.addFromString(grammar, 1);
        this._recognition.grammars = this._speechRecognitionList;
    }

    /**
     * Speaking something
     * @param {string} input 
     */
    speak(input: string) {
        var utterThis = new SpeechSynthesisUtterance(input);
        this.synth.speak(utterThis);
    }

}

/***
 * Exentsion for Input to Achieve Voice-Input
 */
export class VoiceInput extends HTMLTextAreaElement {

    private _speechWrapper = new SpeechWrapper();
    private _started: boolean = false;

    constructor() {
        super();
        this._speechWrapper.onresult = function(result:string) {
            this.value += result;
        }.bind(this);

        this._addVoiceInputButton();
    }


    /**
     * Adding Voice-Input Button to Text-Field
     */
    _addVoiceInputButton() {
        let button: HTMLButtonElement = document.createElement("button");
        button.textContent = "Aufnahme starten";
        button.type = "button";
        let _self = this;

        button.addEventListener("click", (e) => {
            _self._started = !_self._started;
            button.textContent = "Aufnahme " + (_self._started ? "stoppen" : "starten");
            if (_self._started) {
                _self._speechWrapper.speak("Aufnahme gestartet");
                _self._speechWrapper.start();
            } else {
                _self._speechWrapper.speak("Aufnahme gestoppt");
                _self._speechWrapper.stop();
            }
        })

        this.parentElement?.appendChild(button);
    }
}

customElements.define('voice-input', VoiceInput, {
    extends: 'textarea',
});