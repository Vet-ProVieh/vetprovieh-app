
import {CustomChoices} from '../../../../src/shared'

var exampleValues = [
    'first value',
    'second value',
    'third value'
]

describe('bind', () => {
    it('should set value correctly', () => {
        let customChoices = new CustomChoices();
        customChoices.value = exampleValues;
        expect(customChoices.value).toEqual(exampleValues)
    });
});

describe('render', () => {
    it('should render value correctly', () => {
        let customChoices = new CustomChoices();
        customChoices.value = exampleValues;

    });


    it('should render attach button', () => {
        let customChoices = new CustomChoices();

        expect(customChoices.innerHTML).toMatch(/<button/)
    });
});

describe('attach', () => {

})

