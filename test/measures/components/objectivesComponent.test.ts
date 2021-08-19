import { Objective, ObjectiveItemComponent, ObjectivesComponent } from "../../../src/measures";


var objectivesComponent: ObjectivesComponent;

var objectiv = new Objective();
objectiv.name = "TestObjective";
objectiv.id = 1;

var objectives : any[] = [objectiv];


describe('visiblity by state', () => {

    /**
     * Loading Add-Buttons from objectivesComponent
     * @returns {any[]}
     */
    var getAddButtons = function() : any[] {
        return [
            objectivesComponent.shadowRoot?.getElementById("addMeasure"),
            objectivesComponent.shadowRoot?.getElementById("loadMeasure")
        ];
    }

    /**
     * Loading ObjectiveItems from DOM
     * @returns {NodeListOf<Element>}
     */
    var loadObjectiveItems = function() : NodeListOf<Element> | undefined {
        return objectivesComponent.shadowRoot?.querySelectorAll("vp-objective-item");
    }

    describe('valuation', () => {

        beforeEach(() => {
            objectivesComponent = new ObjectivesComponent();
            objectivesComponent.state = "valuation";
            objectivesComponent.render();
            objectivesComponent.objectives = objectives;
        });

        it('should set objective-item to show valuation', () => {
            let objectiveItems = loadObjectiveItems();

            expect(objectiveItems?.length).toBeGreaterThan(0);

            objectiveItems?.forEach((objectiveItem) => {
                let e = objectiveItem as ObjectiveItemComponent;
                expect(e.valuation).toEqual("true");
            })
        });

        it('should hide creation buttons', () => {
            let buttons = getAddButtons();

            expect(buttons.length).toBeGreaterThan(0);

            buttons.forEach((button) => {
                expect(button).toBeDefined();
                expect(button?.classList.contains("is-hidden")).toBeTruthy();
            });
        });

        it('should disable edit of objective-items', () => {
            let objectiveItems = loadObjectiveItems();

            expect(objectiveItems?.length).toBeGreaterThan(0);

            objectiveItems?.forEach((objectiveItem) => {
                let e = objectiveItem as ObjectiveItemComponent;
                expect(e.editable).toEqual("false");
            })
        });
    });

    describe('planing or exectuion', () => {

        beforeEach(() => {
            objectivesComponent = new ObjectivesComponent();
            objectivesComponent.render();
            objectivesComponent.objectives = objectives;
        });

        it('should set objective-item to no Valuation', () => {
            let objectiveItems = loadObjectiveItems();

            expect(objectiveItems?.length).toBeGreaterThan(0);

            objectiveItems?.forEach((objectiveItem) => {
                let e = objectiveItem as ObjectiveItemComponent;
                expect(e.valuation).toEqual("false");
            })
        });

        it('should show creation buttons', () => {
            let buttons = getAddButtons();

            expect(buttons.length).toBeGreaterThan(0);

            buttons.forEach((button) => {
                expect(button).toBeDefined();
                expect(button?.classList.contains("is-hidden")).toBeFalsy();
            });
        });

        it('should edit objectives', () => {
            let objectiveItems = loadObjectiveItems();

            expect(objectiveItems?.length).toBeGreaterThan(0);

            objectiveItems?.forEach((objectiveItem) => {
                let e = objectiveItem as ObjectiveItemComponent;
                expect(e.editable).toEqual("true");
            })
        });
    });

});