
import { InputFactory } from '../../../../../src/careplans/operational/components/field/inputFactory';

describe('generateField', () => {

    describe('unknown field-type', () => {
        it('should return Unknown-Field', () => {
            let input = InputFactory.generateField("UNKNOWN", {});
            expect(input).toEqual("<p>Unknown Input</p>");
        });
    });

    describe('textArea', () => {

        let genTextArea = (opts={}) => {
            return InputFactory.generateField("textArea", opts);
        }

        let random = () => {
            return  Math.floor((Math.random() * 10)) +1;
        }

        it('should return a text-area', () => {
            let textArea = genTextArea();
            expect(textArea).toMatch(`<textarea property="value" class="input" type="text"></textarea>`);
        });

        it('should have name', () => {
            let textArea = genTextArea({name: "test"});
            expect(textArea).toMatch(`<textarea property="value" name="test" class="input" type="text"></textarea>`);
        });

        it('should set cols', () => {
            let colAmount = random();
            let textArea = genTextArea({cols: colAmount});
            expect(textArea).toMatch(`<textarea property="value" cols="${colAmount}" class="input" type="text"></textarea>`);
        });

        it('should set rows', () => {
            let rowAmount = random();
            let textArea = genTextArea({rows: rowAmount});
            expect(textArea).toMatch(`<textarea property="value" rows="${rowAmount}" class="input" type="text"></textarea>`);
        });

        it('should set disabled', () => {
            let textArea = genTextArea({optional: false});
            expect(textArea).toMatch(`<textarea property="value" required class="input" type="text"></textarea>`);
        });

        it('should set voiceable', () => {
            let textArea = genTextArea({voiceInputable: true});
            expect(textArea).toMatch(`<textarea property="value" is="voice-input" class="input" type="text"></textarea>`);
        });
    });
})