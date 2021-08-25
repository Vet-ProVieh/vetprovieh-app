import { MeasureField, MeasureFieldComponent } from '../../../src/measures';
import { BulmaMultiCheckbox } from '../../../src/shared';


function buildMeasureChoiceField() : MeasureField {
    return {
        "choices": [
            "Ja",
            "Nein"
        ],
        "detailsType": "checkBox",
        "name": "Weitere Berater",
        "optional": false,
        "position": 7,
        "value": "",
        "voiceInputable": false
    } as MeasureField;
}

let measureFieldChoice: MeasureField = buildMeasureChoiceField();

let measureFieldText: MeasureField = {
    "detailsType": "textArea",
    "name": "Weitere Berater (Name, Anschrift)",
    "optional": false,
    "position": 8,
    "value": "",
    "linkPosition": {
        "id": 7,
        "value": "Ja"
    },
    "voiceInputable": false
} as MeasureField;


let field1: MeasureFieldComponent;

let field2: MeasureFieldComponent;


describe('linkToField', () => {

    beforeAll(() => {
        field1 = new MeasureFieldComponent();
        field1.object = measureFieldChoice;
        field1.connectedCallback();

        field2 = new MeasureFieldComponent();
        field2.object = measureFieldText;
        field2.connectedCallback();
        field2.linkToField(field1);
    })

    describe('without init value', () => {
        it('should have a linked field', () => {
            expect(field2.linkedField).toEqual(field1);
        });

        it('should not show field on init', () => {
            expect(field2.classList.contains("is-hidden")).toBeTruthy();
        });

        it('should not be required', () => {
            let textarea = field2.querySelector("textarea") as HTMLTextAreaElement;
            expect(textarea.required).toBeFalsy();
        });
    });

    describe('with init value', () => {

        beforeAll(() => {
            let choice = buildMeasureChoiceField();
            choice.value = "Ja";
            field1 = new MeasureFieldComponent();
            field1.object = choice;
            field1.connectedCallback();

            field2 = new MeasureFieldComponent();
            field2.object = measureFieldText;
            field2.connectedCallback();
            field2.linkToField(field1);
        })

        it('should show field', () => {
            expect(field2.classList.contains("is-hidden")).toBeFalsy();            
        });

        it('should require field', () => {
            let textarea = field2.querySelector("textarea") as HTMLTextAreaElement;
            expect(textarea.required).toBeTruthy();
        });
    });

    describe('on change event', () => {
        let loadBox = function (yes: boolean = true): HTMLInputElement {
            let checkbox = field1.querySelector("bulma-multi-checkbox") as BulmaMultiCheckbox;
            let yesBox = (checkbox as any)["inputFields"][yes ? 0 : 1] as HTMLInputElement;
            return yesBox;
        }

        describe('required', () => {
            describe('on active value', () => {
                it('should show input', () => {
                    loadBox().click();
                    expect(field2.classList.contains("is-hidden")).toBeFalsy();
                });

                it('should mark as required', () => {
                    loadBox().click();
                    let textarea = field2.querySelector("textarea") as HTMLTextAreaElement;
                    expect(textarea.required).toBeTruthy();
                });
            });

            describe('on inactive value', () => {
                it('should hide input', () => {
                    loadBox(false).click();
                    expect(field2.classList.contains("is-hidden")).toBeTruthy();
                });

                it('should mark as not required', () => {
                    loadBox(false).click();
                    let textarea = field2.querySelector("textarea") as HTMLTextAreaElement;
                    expect(textarea.required).toBeFalsy();
                });
            });
        });

        describe('optional', () => {
            beforeAll(() => {
                field1 = new MeasureFieldComponent();
                field1.object = measureFieldChoice;
                field1.connectedCallback();

                field2 = new MeasureFieldComponent();
                measureFieldText.optional = true;
                field2.object = measureFieldText;
                field2.connectedCallback();
                field2.linkToField(field1);
            })

            it('should show input', () => {
                loadBox().click();
                expect(field2.classList.contains("is-hidden")).toBeFalsy();
            });

            it('should mark as not required', () => {
                loadBox(false).click();
                let textarea = field2.querySelector("textarea") as HTMLTextAreaElement;
                expect(textarea.required).toBeFalsy();
            });
        });
    });
});