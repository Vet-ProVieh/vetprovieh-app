import { OpenObjectivesButton } from "../../../src/measures";


describe('amount', () => {

    let button: OpenObjectivesButton;

    beforeEach(() => {
        button = new OpenObjectivesButton();
    });

    it('should be hidden if amount is empty', () => {
        button.render();
        button.connectedCallback();
        expect(button.classList.contains("is-hidden")).toEqual(true);
    });


    it('should be hidden if amount is 0', () => {
        button.amount = 0;
        button.render();
        button.connectedCallback();
        expect(button.classList.contains("is-hidden")).toEqual(true);
    });

    it('should be visibile if amonut > 0', () => {
        button.amount = 1;
        button.render();
        button.connectedCallback();
        expect(button.classList.contains("is-hidden")).toEqual(false);
    });
});