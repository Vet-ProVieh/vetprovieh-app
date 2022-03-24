import {SpeechWrapper} from './speechWraper';

/**
 * Interpret Response of the recognized Speech
 */
export class ResponseInterpreter {
    /**
     * @return {boolean}
     */
    private markFieldEmitter: (fieldName: string,
      final:boolean) => any = () => false;

    private speechWraper: SpeechWrapper;

    /**
     * Constructor
     * @param {SpeechWrapper} speechWrapper
     */
    constructor(speechWrapper: SpeechWrapper) {
      this.speechWraper = speechWrapper;
      this.register(this.speechWraper);
    }

    /**
     * Register the SpeechWrapper
     * @param {SpeechWrapper} wrapper
     */
    public register(wrapper: SpeechWrapper) {
      const func = (event: any) => {
        this.interpretResult(event);
      };
      func.bind(this);
      wrapper.onresultRaw = func;
    }

    /**
     * On MarkingField
     * @param {any} func
     */
    public set onMarkField(func: (fieldName: string, final:boolean) => any) {
      if (func !== this.markFieldEmitter) {
        this.markFieldEmitter = func;
      }
    }


    /**
     * Interpreting Result
     * @param {any} event
     */
    public interpretResult(event: any) {
      this.recognizeMarkField(event);
    }

    /**
     * Splitting Results and Fields
     * @param {string} transcript
     * @param {boolean} final
     */
    private splitResultAndSetFields(transcript: string, final: boolean) {
      const sentences = transcript.split('weiter');

      sentences.forEach((sentence: string) => {
        const match = sentence.match(/^([a-zA-Z ]+): ([a-zA-Z0-9\., ]+)$/);
        if (match && match.length >= 2) {
          const field = match[1].toLowerCase().trim();
          const value = match[2].trim();
          this.setField(field, value, final);
        }
      });
    }

    /**
     * Setting Field
     * @param {stirng} name
     * @param {string} value
     * @param {boolean} final
     */
    private setField(name: string, value: string, final: boolean) {
      const found = this.markFieldEmitter(name, final);
      if (found) {
        found.value = value;
      }
    }

    /**
     * Recognize marked fields
     * @param {any} event
     */
    private recognizeMarkField(event: any) {
      const value = event[0].transcript as string;
      const match = value.match(/([a-z ]+)/);

      if (match) {
        this.splitResultAndSetFields(value, event.isFinal);
      }
    }
}
