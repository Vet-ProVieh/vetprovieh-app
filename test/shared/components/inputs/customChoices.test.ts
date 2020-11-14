
import { CustomChoices } from '../../../../src/shared'

var exampleValues = [
    'first value',
    'second value',
    'third value'
]
var templateString = `<div>{{value}}</div>`;

var buildTemplate = function () {
    let newTemplate = document.createElement("template");
    newTemplate.innerHTML = templateString;
    return newTemplate;
}
/*
describe('bind', () => {
    it('should set value correctly', () => {
        let customChoices = new CustomChoices();
        customChoices.value = exampleValues;
        expect(customChoices.value).toEqual(exampleValues)
    });
});*/

let customChoices: CustomChoices;
describe('render', () => {
    beforeEach(() => {
        customChoices = new CustomChoices();

    })
});

describe('attach', () => {

})

