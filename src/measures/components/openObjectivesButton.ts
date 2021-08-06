import { VetproviehElement, WebComponent } from "@tomuench/vetprovieh-shared/lib";

@WebComponent({
    template: `
        <bulma-fab-button class="\${this.renderVisiblity()}" href="\${this.href}" icon="fa-info" size="small"></bulma-fab-button>
    `,
    tag: 'open-objectives'
})
export class OpenObjectivesButton extends VetproviehElement {

    private _amount: number = 0;

    /**
     * Amount of open Objectives
     * @property {number} amount
     */
    public get amount(): number {
        return this._amount;
    }

    public set amount(v: number) {
        this._amount = v;
    }

    /**
     * Rendering Visibility for fab button
     * @returns {string}
     */
    public renderVisiblity(): string {
        return +this.amount > 0 ? '' : 'is-hidden';
    }

    /**
     * Link to OpenMeasures
     * @return {string}
     */
    public get href(): string {
        return "/measures/open.html";
    }


    /**
     * Observed Attributes
     * @return {Array<string>}
     */
     static get observedAttributes() {
        return ['amount']
    }

}