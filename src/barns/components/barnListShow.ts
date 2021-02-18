import { VetproviehElement, WebComponent } from "@tomuench/vetprovieh-shared/lib";
import { Barn } from "../models";
import { BarnsRepository } from "../repository";

/**
 * Show Barn for BarnId
 */
@WebComponent({
    template: `
        <p style="font-size:0.9em">
        <strong>Stall:</strong> \${this.barn?.name} ($\{this.barn?.vvvoNumber})<br />
        <strong>Landwirt:</strong> \${this.barn?.farmer.name} (\${this.barn?.farmer.contactPerson.firstName}
            \${this.barn?.farmer.contactPerson.lastName})<br />
        </p>
    `,
    tag: "barn-list-show"
})
export class BarnListShow extends VetproviehElement {

    private repository: BarnsRepository = new BarnsRepository();

    private _barnId: string = "";

    private barn: Barn | undefined= undefined;

    constructor() {
        super(false, false);
    }

    public get barnid(): string {
        return this._barnId;
    }

    static get observedAttributes() {
        return  ["barnid"];
    }

    public set barnid(v: string) {
        if (this._barnId !== v) {
            this._barnId = v;
            this.loadBarn();
        }
    }

    private loadBarn() {
        if (this._barnId && !isNaN(parseInt(this._barnId))) {
            this.repository.find(parseInt(this._barnId)).then((barn) => {
                this.barn = barn;
                this.render();
            }).catch((error) => {
                console.warn("Could not load Barn")
            })
        }
    }


}