import { SpeechWrapper } from "./speechWraper";


export class ResponseInterpreter {

    private markFieldEmitter: (fieldName: string, final:boolean) => any = (x) => false;
    private speechWraper: SpeechWrapper;

    constructor(speechWrapper: SpeechWrapper) {
        this.speechWraper = speechWrapper;
        this.register(this.speechWraper);
    }

    /**
     * Register the SpeechWrapper
     * @param {SpeechWrapper} wrapper 
     */
    public register(wrapper: SpeechWrapper) {
        let func = (event: any) => {
            this.interpretResult(event);
        }
        func.bind(this);
        wrapper.onresultRaw = func;
    }

    public set onMarkField(func: (fieldName: string, final:boolean) => any) {
        if (func !== this.markFieldEmitter) {
            this.markFieldEmitter = func;
        }
    }


    /**
     * 
     * @param event 
     */
    public interpretResult(event: any) {
        console.log(event);
        this.recognizeMarkField(event);
    }

    private splitResultAndSetFields(transcript: string, final: boolean) {
        let sentences = transcript.split("weiter");

        sentences.forEach((sentence: string) => {
            let match = sentence.match(/^([a-zA-Z ]+): ([a-zA-Z0-9 ]+)$/);
            if (match && match.length >= 2) {
                let field = match[1].toLowerCase().trim();
                let value = match[2].trim();
                this.setField(field, value, final);
            }
        })
    }

    private setField(name: string, value: string, final: boolean) {
        console.log(`Setting Field: ${name} ${value}`);
        let found = this.markFieldEmitter(name, final);
        if (found) {
            found.value = value;
        }
    }

    private recognizeMarkField(event: any) {
        let value = event[0].transcript as string;
        let match = value.match(/([a-z ]+)/);

        if (match) {
            this.splitResultAndSetFields(value, event.isFinal);
        }
    }

    private recognizeEingabe(event: any) {

    }
}