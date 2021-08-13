import { StarsComponent } from '../../../../src/shared';

let field: StarsComponent;

let buildStars = function (activeAmount = 0) {
    let stars = new StarsComponent();
    stars.score = activeAmount;
    stars.render();
    return stars;
}

describe('render', () => {

    beforeEach(() => {
        field = buildStars();
    });

    it('should render stars', () => {
        let foundStars = field.shadowRoot?.querySelectorAll("i.fa-star").length;
        expect(foundStars).toEqual(field.amount);
    });

    it('should render active stars', () => {
        field = buildStars(3);
        if (field && field.amount) {
            let foundStars = field.shadowRoot?.querySelectorAll("i.far.fa-star").length;
            expect(foundStars).toEqual(field.amount - field.score);

            foundStars = field.shadowRoot?.querySelectorAll("i.fas.fa-star").length;
            expect(foundStars).toEqual(field.score);
        }
    });

    it('should be editable', () => {
        let star = field.shadowRoot?.querySelector("i.far.fa-star") as HTMLElement;
        if(star){
            star.click();
            expect(field.score).toEqual(1)
        }
    });

    it('should not be editable', () => {
        field.editable = "false";
        field.render();

        let star = field.shadowRoot?.querySelector("i.far.fa-star") as HTMLElement;
        if(star){
            star.click();
            expect(field.score).toEqual(0)
        }
    });
});
