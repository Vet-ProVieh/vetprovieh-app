import { BulmaField } from '../../../../src/shared';

let field: BulmaField;
/*
<div class="field">
  <label class="label">Username</label>
  <div class="control has-icons-left has-icons-right">
    <input class="input" type="text" placeholder="Text input" value="bulma">
    <span class="icon is-small is-left">
      <i class="fas fa-user"></i>
    </span>
    <span class="icon is-small is-right">
      <i class="fas fa-check"></i>
    </span>
  </div>
  <p class="help is-success">This username is available</p>
</div>*/

describe('render', () => {

    beforeEach(() => {
        field = new BulmaField();
        field.label = "My Field";
        field.value = "Test";
        field.render();
    });


    it('should render label', () => {
        let expectedContent = `<label class="label">${field.label}</label>`;
        expect(field.innerHTML).toMatch(expectedContent);
    });

    it('should render default as a textfield', () => {
        let expectedContent = `<input class="input" type="text">`;

        expect(field.type).toEqual("text");
        expect(field.innerHTML).toMatch(expectedContent);
    });

    it('should set placeholder', () => {
        let placeholder = "My Placeholder-Text";
        field.placeholder = placeholder;
        field.render();

        let expectedContent = `<input class="input" type="text" placeholder="${placeholder}">`;

        expect(field.innerHTML).toMatch(expectedContent);
    });

    describe('type', () => {
        it('should render a number', () => {
            let expectedContent = `<input class="input" type="number">`;
            field.type = "number";
            field.render();
            expect(field.type).toEqual("number");
            expect(field.innerHTML).toMatch(expectedContent);
        });
    })


});

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