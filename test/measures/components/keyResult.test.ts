import { KeyResultComponent } from '../../../src/measures';
import { KeyResult } from '../../../src/measures/models/keyresult';


let field: KeyResultComponent;

let keyResult = new KeyResult();
keyResult.name = "Beispielresult";
keyResult.active = true;
keyResult.position = 1;

describe('render', () => {
    beforeEach(() => {
        field = new KeyResultComponent();
        field.keyResult = keyResult;
        field.render();
    });

    it('should render label', () => {
        let expectedContent = `${field.keyResult.name}`;
        expect(field.shadowRoot?.innerHTML).toMatch(expectedContent);
    });

    it('should have expected state', () => {
        let expectedContent = `<i class="fas fa-check" style="color: black;"></i>`;
        expect(field.shadowRoot?.innerHTML).toMatch(expectedContent);
    });

    it('should have expected states', () => {
        field.toggleState();
        field.render();
        let expectedContent = `<i class="fas fa-check-double" style="color: black;"></i>`;
        expect(field.shadowRoot?.innerHTML).toMatch(expectedContent);
    });
});

describe('change milestone by click', () => {
    
    it('should have normal-state', () => {
        
    });
});

describe('editable', () => {

    beforeEach(() => {
        field = new KeyResultComponent();
        field.keyResult = keyResult;
    });

    var getButton = function (): HTMLButtonElement | null | undefined {
        return field.shadowRoot?.querySelector("button");
    }


    describe('before render', () => {
        describe('be editable', () => {
            it('shoud enable the state button', () => {
                field.editable = "true";
                field.render();

                let button = getButton();

                expect(button?.disabled).toBeFalsy();
            });
        });

        describe('not be editable', () => {
            it('shoud disable the state button', () => {
                field.render();
                let button = getButton();

                expect(button?.disabled).toBeTruthy();
            });
        });
    });
    describe('after render', () => {
        describe('be editable', () => {
            it('shoud enable the state button', () => {
                field.render();
                field.editable = "true";

                let button = getButton();

                expect(button?.disabled).toBeFalsy();
            });
        });

        describe('not be editable', () => {
            it('shoud disable the state button', () => {
                field.editable = "true";
                field.render();
                field.editable = "false";
                let button = getButton();

                expect(button?.disabled).toBeTruthy();
            });
        });
    });

});