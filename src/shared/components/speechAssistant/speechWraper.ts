import { Indexable } from "@tomuench/vetprovieh-shared/lib";

/**
 * Wrapper for the Speech API
 */
export class SpeechWrapper {
    private _recognition: any;
    private _speechRecognitionList: any;
    private _interimResults: boolean = false;

    public get synth() {
        return window.speechSynthesis;
    }

    /**
     * Default-Constructor
     * @param element 
     */
    constructor(interimResults: boolean = false) {
        this._interimResults = interimResults;
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
                this._recognition.interimResults = this._interimResults;
                this._recognition.maxAlternatives = 1;
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
                if (event.isFinal) {
                    func(event.results[0][0].transcript);
                }

            }.bind(this);
        }
    }

    set onresultRaw(func: Function) {
        if (this.ready) {
            this._recognition.onresult = function (event: any) {
                func(event.results[0]);
            }.bind(this);
        }
    }

    /**
     * Init Grammar for Speech Recognition
     */
    _initGrammar() {
        var grammar = '#JSGF V1.0;'
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

    addGrammar(grammarText: string) {
        console.log(grammarText);
        this._speechRecognitionList.addFromString(grammarText, 2);
    }

}