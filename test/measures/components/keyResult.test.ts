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
        let expectedContent = `<i class="fas fa-check" id="check" style="cursor: pointer; color: black;"></i>`;
        expect(field.shadowRoot?.innerHTML).toMatch(expectedContent);
    });

    it('should have expected states', () => {
        field.toggleState();
        field.render();
        let expectedContent = `<i class="fas fa-check-double" id="check" style="cursor: pointer; color: black;"></i>`;
        expect(field.shadowRoot?.innerHTML).toMatch(expectedContent);
    });
});

describe('editable', () => {

    var getButton = function() : HTMLButtonElement | null | undefined {
        return field.shadowRoot?.querySelector("button");
    }

    beforeEach(() => {
        field = new KeyResultComponent();
        field.keyResult = keyResult;
    });

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

/*
describe('value and binding', () => {

    let input : HTMLInputElement;

    beforeEach(() => {
        field = new BulmaField();
        field.label = "My Field";
        field.value = "Test";
        field.render();
        input = field.getElementsByTagName("input")[0] as HTMLInputElement;
    });

    it('should set value and render', () => {
        if(input) {
            expect(input.value).toEqual(field.value);
        } else {
            expect(true).toEqual(false);
        }
    });

    it('should create a two way binding', () => {
        expect(input.value).toEqual(field.value);
        input.value = "Something Else";
        input.dispatchEvent(new Event("change"));
        expect(field.value).toEqual(input.value);
    });
});
*/