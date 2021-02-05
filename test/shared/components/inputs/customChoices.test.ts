
import { BulmaField, CustomChoices } from '../../../../src/shared'

var exampleValues = [
    'first value',
    'second value',
    'third value'
];

let customChoices: CustomChoices;
beforeEach(() => {
    customChoices = new CustomChoices();
})

describe('bind', () => {
    it('should set value correctly', () => {
        customChoices.value = exampleValues;
        expect(customChoices.value).toEqual(exampleValues)
    });
});


describe('render', () => {

    it('should ', () => {

    });
});

describe('attach', () => {
    let button: HTMLButtonElement;

    let setButton = () => {
        button = customChoices.getByIdFromShadowRoot("addElement") as HTMLButtonElement;
    };

    it('should attach value', () => {
        customChoices.value = exampleValues.map((e) => e);
        customChoices.render();

        setButton();
        button.click();

        expect(customChoices.value.length).toEqual(exampleValues.length + 1);
    });

    it('should attach value and change', () => {
        let values: string[] = [];
        customChoices.value = values;
        customChoices.render();

        setButton();
        button.click();

        expect(customChoices.value.length).toEqual(1);
        expect(values[0]).toEqual("");

        let choices = customChoices.getByIdFromShadowRoot("choices") as HTMLDivElement;
        let inputs = choices.querySelectorAll("bulma-input");
        let input = inputs[inputs.length -1] as BulmaField;

        input.value = "Test";
        input.dispatchEvent(new Event("change"));
        expect(values[0]).toEqual(input.value);
    });

    it('should change value', () => {
        let values = exampleValues.map((e) => e);
        customChoices.value = values;
        customChoices.render();

        setButton();
        button.click();

        let choices = customChoices.getByIdFromShadowRoot("choices") as HTMLDivElement;
        let inputs = choices.querySelectorAll("bulma-input");
        let input = inputs[inputs.length -1] as BulmaField;

        input.value = "Test";
        input.dispatchEvent(new Event("change"));
        expect(values[3]).toEqual(input.value);

    });
})

