
import { InputFactory } from '../../../../../src/careplans/operational/components/field/inputFactory';

describe('generateField', () => {

    describe('unknown field-type', () => {
        it('should return Unknown-Field', () => {
            let input = InputFactory.generateField("UNKNOWN", {});
            expect(input).toMatch("<p>Unknown Input</p>");
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
            expect(textArea).toMatch(`<textarea property="value" class="input" type="text" required ></textarea>`);
        });

        it('should have name', () => {
            let textArea = genTextArea({name: "test"});
            expect(textArea).toMatch(`<textarea property="value" name="test" class="input" type="text" required ></textarea>`);
        });

        it('should set cols', () => {
            let colAmount = random();
            let textArea = genTextArea({cols: colAmount});
            expect(textArea).toMatch(`<textarea property="value" cols="${colAmount}" class="input" type="text" required ></textarea>`);
        });

        it('should set rows', () => {
            let rowAmount = random();
            let textArea = genTextArea({rows: rowAmount});
            expect(textArea).toMatch(`<textarea property="value" rows="${rowAmount}" class="input" type="text" required ></textarea>`);
        });

        it('should set required', () => {
            let textArea = genTextArea({optional: false});
            expect(textArea).toMatch(`<textarea property="value" class="input" type="text" required ></textarea>`);
        });

        it('should set voiceable', () => {
            let textArea = genTextArea({voiceInputable: true});
            expect(textArea).toMatch(`<textarea property="value" is="voice-input" class="input" type="text" required ></textarea>`);
        });

        it('should not attach invalid option', () => {
            let textArea = genTextArea({somethingStrange: 'blabla'});
            expect(textArea).toMatch(`<textarea property="value" class="input" type="text" required ></textarea>`);
        });
    });

    describe('video', () => {
        let genVideo = (opts={}) => {
            return InputFactory.generateField("video", opts);
        }
        it('should render without options', () => {
            let video = genVideo({});
            expect(video).toMatch(`<vetprovieh-video ></vetprovieh-video>`);
        });

        it('should have name', () => {
            let video = genVideo({name: "testvideo"});
            expect(video).toMatch(`<vetprovieh-video name="testvideo" ></vetprovieh-video>`);
        });
    });

    describe('careplanList', () => {
        let genList = (opts={}) => {
            return InputFactory.generateField("careplanList", opts);
        }

        it('should have not a multiple tag', () => {
            let list = genList({name: "testlist"});
            expect(list).not.toMatch(" multiple");
        });

        it('should have name tag', () => {
            let list = genList({name: "testlist"});

            expect(list).toMatch(`<select property="value" size="8" style="height: 10em" name="testlist" required ></select>`)
        });

        it('should have options', () => {
            let choices = ["a","b","c"];
            let list = genList({choices: choices});
            choices.forEach((choice) => {
                expect(list).toMatch(`<option value="` + choice + `">` + choice + `</option>`);
            })
        });

        it('should be marked as multiple', () => {
            let list = genList({multipleSelect: true});
            expect(list).toMatch("is-multiple");
            expect(list).toMatch(`<select property="value" size="8" style="height: 10em" multiple required ></select>`);
        });

        it('should have property', () => {
            let list = genList();
            expect(list).toMatch(`property="value"`);
        });

        it('should not set required', () => {
            let list = genList({optional: true});
            expect(list).not.toMatch(`required`);
        });
    });

    describe('comboBox', () => {
        let genCombo = (opts={}) => {
            return InputFactory.generateField("comboBox", opts);
        }

        it('should have name tag', () => {
            let combo = genCombo({name: "test"});
            expect(combo).toMatch(`<select property="value" name="test" required ></select>`);
        });

        it('should have property', () => {
            let combo = genCombo();
            expect(combo).toMatch(`property="value"`);
        });

    });

    describe('textFields', () => {
        let genTextField = (opts={}) => {
            return InputFactory.generateField("textFields", opts);
        }

        it('should generate ', () => {
            let textField = genTextField();
            expect(textField).toMatch(`<input property="value" class="input" type="text">`)
        });

        it('should have property', () => {
            let textField = genTextField();
            expect(textField).toMatch(`property="value"`);
        });

        it('should set voiceable', () => {
            let textArea = genTextField({voiceInputable: true});
            expect(textArea).toMatch(`<input property="value" is="voice-input" class="input" type="text">`);
        });
    });

    describe('speech', () => {
        let genSpeech = (opts={}) => {
            return InputFactory.generateField("speech", opts);
        }

        it('should generate expected', () => {
            let speech = genSpeech({});
            expect(speech).toMatch("<vetprovieh-speech ></vetprovieh-speech>");
        });
        
    });

    describe('image', () => {
        let genImage = (opts={}) => {
            return InputFactory.generateField("image", opts);
        }

        it('should render with name', () => {
            let image = genImage({name: "test"});
            expect(image).toMatch(`<vetprovieh-video type="image" name="test" ></vetprovieh-video>`);
        });
    });
})