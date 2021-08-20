import { VetproviehElement, ViewHelper, WebComponent } from "@tomuench/vetprovieh-shared/lib";

@WebComponent({
    template: `
        <bulma-fab-button href="\${this.href}" icon="fa-info" size="small"></bulma-fab-button>
    `,
    tag: 'open-objectives'
})
export class OpenObjectivesButton extends VetproviehElement {

    private _amount: number = 0;
    private _barnId : number = 0;


    public get barnId() : number {
        return this._barnId;
    }
    public set barnId(v : number) {
        if(this._barnId !== v){
            this._barnId = v;
            this.render();
        }
    }
    

    /**
     * Amount of open Objectives
     * @property {number} amount
     */
    public get amount(): number {
        return this._amount;
    }

    public set amount(v: number) {
        if (this.amount != +v) {
            this._amount = +v;
            this.setVisibility();
        }
    }

    connectedCallback() {
        super.connectedCallback();

        this.setVisibility();
    }

    /**
     * Rendering Visibility for fab button
     * @returns {string}
     */
    public setVisibility() {
        ViewHelper.toggleVisibility(this, +this.amount > 0);
    }

    /**
     * Link to OpenMeasures
     * @return {string}
     */
    public get href(): string {
        return `/measures/open.html?barnId=${this.barnId}`;
    }


    /**
     * Observed Attributes
     * @return {Array<string>}
     */
    static get observedAttributes() {
        return ['amount', 'barnId']
    }

}