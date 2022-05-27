import {Indexable} from '@vetprovieh/vetprovieh-shared';

/**
 * Wrapper for the Speech API
 */
export class SpeechWrapper {
    private _recognition: any;
    private _speechRecognitionList: any;
    private _interimResults = false;

    /**
     * Getting Speech-Synh
     * @return {SpeechSynthesis}
     */
    public get synth() {
      return window.speechSynthesis;
    }

    /**
     * Default-Constructor
     * @param {boolean} interimResults
     */
    constructor(interimResults = false) {
      this._interimResults = interimResults;
      this._initRecognition();
    }

    /**
     * Loading Speech Recognition
     * @return {SpeechRecognition}
     */
    private getSpeechRecognition(): any {
      return (window as Indexable)['webkitSpeechRecognition'] ||
      SpeechRecognition;
    }

    /**
     * Get SpeechRecognitionEvent
     * @return {SpeechRecognitionEvent}
     */
    private getSpeechRecognitionEvent(): any {
      return (window as Indexable)['webkitSpeechRecognitionEvent'] ||
      SpeechRecognitionEvent;
    }

    /**
     * Loading Grammer
     * @return {SpeechGrammarList}
     */
    private getGrammarList(): any {
      return (window as Indexable)['webkitSpeechGrammarList'] ||
      SpeechGrammarList;
    }

    /**
     * VoiceInput Ready?
     * @return {boolean}
     */
    public get ready(): boolean {
      return this._recognition !== undefined;
    }

    /**
     * Initialise Recognition
     */
    private _initRecognition() {
      try {
        const SpeechRecognition = this.getSpeechRecognition();
        this._recognition = new SpeechRecognition();

        this._initGrammar();

        if (this.ready) {
          this._recognition.continuous = true;
          this._recognition.lang = 'de-DE';
          this._recognition.interimResults = this._interimResults;
          this._recognition.maxAlternatives = 1;
        }
      } catch (ex) {
        console.log('Could not init Speech-Recognition');
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

    /**
     * On Result Callback
     * @param {Function} func
     */
    set onresult(func: Function) {
      if (this.ready) {
        this._recognition.onresult = function(event: any) {
          if (event.isFinal) {
            func(event.results[0][0].transcript);
          }
        };
      }
    }

    /**
     * Speech Recognition ended
     * @param {Function} func
     */
    set onaudioend(func: Function) {
      if (this.ready) {
        this._recognition.onaudioend = function() {
          func({});
        };
      }
    }

    /**
     * On Results Raw Callback
     * @param {Function} func
     */
    set onresultRaw(func: Function) {
      if (this.ready) {
        this._recognition.onresult = function(event: any) {
          func(event.results[0]);
        };
      }
    }

    /**
     * Init Grammar for Speech Recognition
     */
    _initGrammar() {
      const grammar = '#JSGF V1.0;';
      const SpeechGrammarList: any = this.getGrammarList();
      this._speechRecognitionList = new SpeechGrammarList();
      this._speechRecognitionList.addFromString(grammar, 1);
      this._recognition.grammars = this._speechRecognitionList;
    }

    /**
     * Speaking something
     * @param {string} input
     */
    speak(input: string) {
      const utterThis = new SpeechSynthesisUtterance(input);
      this.synth.speak(utterThis);
    }

    /**
     * Add new Grammar
     * @param {string} grammarText
     */
    addGrammar(grammarText: string) {
      this._speechRecognitionList.addFromString(grammarText, 2);
    }
}
