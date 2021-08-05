import { VetproviehList } from "@tomuench/vetprovieh-list/lib/vetprovieh-list";
import { OperationPlan, OperationPlanSelectPage } from "../../../../src/careplans";
import { OperationPlansRepository } from "../../../../src/careplans/operational/repository";

var page: OperationPlanSelectPage;

var genTestPlan = function (id: number) {
    let testPlan = new OperationPlan();
    testPlan.id = id;
    testPlan.barn = {id: id};
    testPlan.name = `Testplan ${id}`;
    return testPlan
}

var testPlans = [genTestPlan(1), genTestPlan(2)]


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
        it('should return expected amount of operationPlans', () => {
            let spy = jest.spyOn(page, 'operationPlans', 'get')
                 .mockImplementation(() => testPlans);
            let spy2 = jest.spyOn(page, 'selectedOperationPlanIds', 'get')
                .mockImplementation(() => [1]);
            
            expect(page.selectedOperationPlans.length).toEqual(1);
    
            spy.mockRestore();
            spy2.mockRestore();
        });
    
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
            let rep = (page as any)["repository"] as OperationPlansRepository;
            let repMock = jest.spyOn<any,any>(rep, 'all')
            .mockImplementation(() => new Promise((resolve, reject) =>{ resolve(testPlans) }));

            page.connectedCallback();

            let spy2 = jest.spyOn(page, 'selectedOperationPlanIds', 'get')
                .mockImplementation(() => [1]);
            
            expect(page.selectedOperationPlans.length).toEqual(1);
    
            repMock.mockRestore();
            spy2.mockRestore();
        });
    });
});