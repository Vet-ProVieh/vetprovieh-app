import { BulmaMultiCheckbox } from '../../../../src/shared';

let field: BulmaMultiCheckbox;

let buildCheckbox = function (asArray: Boolean = true) {
    let f = new BulmaMultiCheckbox();
    f.label = "My Field";
    if (asArray) {
        f.choices = ["A", "B", "C"];
    } else {
        f.choicesasstring = "A,B,C";
    }
    f.render();
    return f;
}

let getBoxByValue = function (name: string) {
    if (field.shadowRoot) {
        return field.shadowRoot
            .querySelector(`input[value="${name}"]`) as HTMLInputElement;
    } else {
        return undefined;
    }

}

describe('render', () => {

    beforeEach(() => {
        field = buildCheckbox();
    });

    it('should render choices', () => {
        field.choices.forEach((choice) => {
            let box = field.shadowRoot?.querySelector(`input[value="${choice}"]`)
            expect(box).toBeDefined();
        })
    });
});

describe('value and binding', () => {

    beforeEach(() => {
        field = buildCheckbox();
    });

    it('should raise exception if an unknown choice', () => {
        expect(() => field.value = "X").toThrow(TypeError);
    });

    it('should mark value as checked', () => {
        field.value = "B";

        let box = getBoxByValue("B")
        expect(box?.checked).toBeTruthy();
    });

    it('should mark multiple values as checked', () => {
        field.value = "A,B";

        field.value.split(",").forEach((value) => {
            let box = getBoxByValue(value)
            expect(box?.checked).toBeTruthy();
        })
    });

    it('should write value back in field', () => {
        let box = getBoxByValue("B");
        if(box){
            box.click();
            expect(field.value).toEqual(box.value);
        } else {
            expect(true).toEqual(false)
        }
    });
});


describe('choices as String', () => {
    beforeEach(() => {
        field = buildCheckbox(false);
    });

    it('should render choices', () => {
        field.choices.forEach((choice) => {
            let box = getBoxByValue(choice);
            expect(box).toBeDefined();
        })
    });
})