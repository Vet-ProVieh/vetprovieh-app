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

    private _barnid: string = "";

    private barn: Barn | undefined = undefined;

    constructor() {
        super(false, false);
    }

    public get barnid(): string {
        return this._barnid;
    }

    static get observedAttributes() {
        return ["barnid"];
    }

    public set barnid(v: string) {
        if (this._barnid !== v) {
            this._barnid = v;
            this.loadBarn();
        }
    }

    private loadBarn() {
        try {
            if (this.barnid && !isNaN(parseInt(this.barnid))) {
                this.repository.find(parseInt(this.barnid)).then((barn) => {
                    this.barn = barn;
                    this.render();
                }).catch((error) => {
                    console.warn("Could not load Barn")
                })
            }
        } catch(ex) {
            console.log(ex.message);
        }
        
    }


}