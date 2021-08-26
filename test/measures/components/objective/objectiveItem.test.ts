import { KeyResultComponent, Objective, ObjectiveItemComponent } from "../../../../src/measures";


var objectiveItem: ObjectiveItemComponent;

var objective = new Objective();
objective.name = "TestObjective";
objective.id = 1;


describe('editable', () => {


    /**
     * Loading button
     * @param {string} id
     * @returns {any[]}
     */
    var getButton = function (id: string): HTMLElement | null | undefined {
        return objectiveItem.shadowRoot?.getElementById(id);
    }

    /**
     * Get KeyResults from DOM
     * @returns {NodeListOf<Element> | undefined}
     */
    var getKeyResults = function (): NodeListOf<Element> | undefined {
        return objectiveItem.shadowRoot?.querySelectorAll("vp-key-result");
    }


    describe('is editable', () => {

        describe('before render', () => {
            beforeEach(() => {
                objectiveItem = new ObjectiveItemComponent();
                objectiveItem.editable = "true";
                objectiveItem.objective = objective;
                objectiveItem.render();
            });

            it('should show edit button', () => {
                let button = getButton("editButton");
                expect(button?.classList.contains("is-hidden")).toBeFalsy();
            });

            it('should show delete button', () => {
                let button = getButton("deleteButton");
                expect(button?.classList.contains("is-hidden")).toBeFalsy();
            });

            it('should activate keyResults', () => {
                var keyresults = getKeyResults();
                expect(keyresults?.length).toBeGreaterThan(0);
                keyresults?.forEach((keyResult) => {
                    let e = keyResult as KeyResultComponent;
                    expect(e?.editable).toEqual("true");
                })
            });
        });
        describe('after render', () => {
            beforeEach(() => {
                objectiveItem = new ObjectiveItemComponent();
                objectiveItem.objective = objective;
                objectiveItem.render();
                objectiveItem.editable = "true";
            });

            it('should show edit button', () => {
                let button = getButton("editButton");
                expect(button?.classList.contains("is-hidden")).toBeFalsy();
            });

            it('should show delete button', () => {
                let button = getButton("deleteButton");
                expect(button?.classList.contains("is-hidden")).toBeFalsy();
            });

            it('should activate keyResults', () => {
                var keyresults = getKeyResults();
                expect(keyresults?.length).toBeGreaterThan(0);
                keyresults?.forEach((keyResult) => {
                    let e = keyResult as KeyResultComponent;
                    expect(e?.editable).toEqual("true");
                })
            });
        });
    });

    describe('is not editable', () => {

        describe('before render', () => {
            beforeEach(() => {
                objectiveItem = new ObjectiveItemComponent();
                objectiveItem.editable = "false";
                objectiveItem.objective = objective;
                objectiveItem.render();
            });

            it('should not show edit button', () => {
                let button = getButton("editButton");
                expect(button?.classList.contains("is-hidden")).toBeTruthy();
            });

            it('should not show delete button', () => {
                let button = getButton("deleteButton");
                expect(button?.classList.contains("is-hidden")).toBeTruthy();
            });

            it('should activate keyResults', () => {
                var keyresults = getKeyResults();
                expect(keyresults?.length).toBeGreaterThan(0);
                keyresults?.forEach((keyResult) => {
                    let e = keyResult as KeyResultComponent;
                    expect(e?.editable).toEqual("false");
                })
            });
        });

        describe('after render', () => {
            beforeEach(() => {
                objectiveItem = new ObjectiveItemComponent();
                objectiveItem.editable = "true";
                objectiveItem.objective = objective;
                objectiveItem.render();
                objectiveItem.editable = "false";
            });

            it('should not show edit button', () => {
                let button = getButton("editButton");
                expect(button?.classList.contains("is-hidden")).toBeTruthy();
            });

            it('should not show delete button', () => {
                let button = getButton("deleteButton");
                expect(button?.classList.contains("is-hidden")).toBeTruthy();
            });

            it('should activate keyResults', () => {
                var keyresults = getKeyResults();
                expect(keyresults?.length).toBeGreaterThan(0);
                keyresults?.forEach((keyResult) => {
                    let e = keyResult as KeyResultComponent;
                    expect(e?.editable).toEqual("false");
                })
            });
        });
    });
});