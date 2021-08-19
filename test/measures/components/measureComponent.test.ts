import { MeasureComponent, ObjectivesComponent } from "../../../src/measures";
import { enableFetchMocks } from 'jest-fetch-mock'
import * as demoData from '../../mock/measures/new.json';
import fetch from 'jest-fetch-mock';

enableFetchMocks();

fetch.mockIf(/service\/measures\/1/, JSON.stringify(demoData));

let measure :MeasureComponent;

describe('should set state to objectivesComponent', () => {
    beforeAll(() => {
        measure = new MeasureComponent();
        measure.objId = "1";
        measure.render();
        let spy2 = jest.spyOn(measure, '_loadHtmlId')
        .mockImplementation(() => null);
        measure.connectedCallback();
    })

    var getObjectiveComponent = function() {
        return measure.shadowRoot?.querySelector("vp-objectives");
    }

    it('should have a objective component', () => {
        let objectiveComponent = getObjectiveComponent() as ObjectivesComponent;

        expect(objectiveComponent).toBeDefined();
        expect(objectiveComponent).not.toBeNull();
        
    });

    describe('on planing', () => {
        it('set state to execution', () => {
            let objectiveComponent = getObjectiveComponent() as ObjectivesComponent;

            expect(objectiveComponent?.state).toEqual("execution");
        });
    });

    describe('on execution', () => {
        it('should set state to execution', () => {
            let objectiveComponent = getObjectiveComponent() as ObjectivesComponent;
            let tabButton = measure.shadowRoot?.querySelector("a[data-id='objectives']") as HTMLAnchorElement;
            if(tabButton){
                tabButton.click();
            }
            expect(objectiveComponent?.state).toEqual("execution");
        });
    });

    describe('on valuation', () => {
        it('should set state to valuation', () => {
            let objectiveComponent = getObjectiveComponent() as ObjectivesComponent;
            let tabButton = measure.shadowRoot?.querySelector("a[data-state='valuation']") as HTMLAnchorElement;
            if(tabButton){
                tabButton.click();
            }
            expect(objectiveComponent?.state).toEqual("valuation");
        });
    });
});