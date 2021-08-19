import fetch, { enableFetchMocks } from 'jest-fetch-mock';
import { OperationPlan, OperationPlanSelectPage } from "../../../../src/careplans";

enableFetchMocks();


var page: OperationPlanSelectPage;

var genTestPlan = function (id: number) {
    let testPlan = new OperationPlan();
    testPlan.id = id;
    testPlan.barn = {id: id};
    testPlan.name = `Testplan ${id}`;
    return testPlan
}

var testPlans = [genTestPlan(1), genTestPlan(2)]

fetch.mockIf(/service\/measures\/operationplans\/barn/,JSON.stringify(testPlans));


beforeEach(() => {
    page = new OperationPlanSelectPage();
    page.connectedCallback();
});


describe('takeoverbutton', () => {
    it('should find takeoverbutton', () => {
        expect(page["takeoverButton"]).not.toBe(undefined);
    });
});

describe('abortButton', () => {
    it('should find abortButton', () => {
        expect(page["abortButton"]).not.toBe(undefined);
    });
})

describe('operationPlans', () => {
    it('should have operationPlans', () => {
        let spy = jest.spyOn(page, 'operationPlans', 'get')
            .mockImplementation(() => testPlans);
        expect(page.operationPlans).toEqual(testPlans);
        spy.mockRestore();
    });
});

describe('selectedOperationPlans', () => {

    describe('mocked', () => {
    
        it('should return expected operationPlan content', () => {
            let spy = jest.spyOn(page, 'operationPlans', 'get')
                .mockImplementation(() => testPlans);
    
            let spy2 = jest.spyOn(page, 'selectedOperationPlanIds', 'get')
                .mockImplementation(() => [1]);

            let opPlan = page.selectedOperationPlans[0];
            expect(opPlan).not.toEqual(undefined);
            expect(opPlan.id).toEqual(1);
            expect(opPlan.name).toEqual("Testplan 1")
    
            spy.mockRestore();
            spy2.mockRestore();
        });
    });
   
    describe('with vetprovieh-list', () => {
        it('should return expected amount of operationPlans', () => {
            
            page = new OperationPlanSelectPage();
            page.connectedCallback();

            let spy2 = jest.spyOn(page, 'selectedOperationPlanIds', 'get')
                .mockImplementation(() => [1]);
            
                setTimeout(() => {
                    expect(page.selectedOperationPlans.length).toEqual(1);
                  }, 500);
    
            spy2.mockRestore();
        });
    });
});