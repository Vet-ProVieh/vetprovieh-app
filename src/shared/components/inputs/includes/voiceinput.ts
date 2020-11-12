import { Indexable } from "@tomuench/vetprovieh-shared/lib";


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

    private getSpeechRecognition(): any {
        return (window as Indexable)['webkitSpeechRecognition'] || SpeechRecognition;
    }

    private getSpeechRecognitionEvent(): any {
        return (window as Indexable)['webkitSpeechRecognitionEvent'] || SpeechRecognitionEvent;
    }

    private getGrammarList(): any {
        return (window as Indexable)['webkitSpeechGrammarList'] || SpeechGrammarList;
    }

    /**
     * VoiceInput Ready?
     * @return {boolean}
     */
    public get ready(): boolean {
        return this._recognition !== undefined;
    }

    private _initRecognition() {
        try {
            var SpeechRecognition = this.getSpeechRecognition();
            var SpeechRecognitionEvent = this.getSpeechRecognitionEvent();
            this._recognition = new SpeechRecognition();

            this._initGrammar();

            if (this.ready) {
                this._recognition.continuous = true;
                this._recognition.lang = 'de-DE';
                this._recognition.interimResults = false;
                this._recognition.maxAlternatives = 1;

                this._recognition.onnomatch = function (event: any) {
                    console.log("I didn't recognise that color.");
                }.bind(this as SpeechWrapper);

                this._recognition.onerror = function (event: any) {
                    console.log('Error occurred in recognition:');
                    console.log(event);
                }
            }
        } catch (ex) {
            console.log("Could not init Speech-Recognition");
        }
    }

    /**
     * Stop Speech Recognition
     */
    stop() {
        if (this.ready) this._recognition.stop();
    }

    /**
     * Start Speech Recognition
     */
    start() {
        if (this.ready) this._recognition.start();
    }

    set onresult(func: Function) {
        if (this.ready) {
            this._recognition.onresult = function (event: any) {
                console.log("HEARED SOMETHING");
                console.log(event);
                func(event.results[0][0].transcript);

            }.bind(this);
        }
    }

    /**
     * Init Grammar for Speech Recognition
     */
    _initGrammar() {
        var grammar = '#JSGF V1.0; grammar colors;'
        var SpeechGrammarList: any = this.getGrammarList();
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
        let self = this;
        this._speechWrapper.onresult = function (result: string) {
            self.value += result;
            self.dispatchEvent(new Event("change"));
        };

    }


    /**
     * Connected Callback
     */
    public connectedCallback() {
        if (this._speechWrapper.ready)
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