
import { WebComponent, VetproviehElement } from "@tomuench/vetprovieh-shared/lib";

const STAR_FULL: string = "fas fa-star";
const STAR_OPEN: string = "far fa-star";

@WebComponent({
    template:
        VetproviehElement.template +
        ` 
    <style>
        #content {
            color: red;
            cursor: pointer;
        }
    </style>

    <div id="content"> 
    </div>
    `,
    tag: "vp-stars",
})

export class StarsComponent extends VetproviehElement {

    private _score: number = 0;
    private _amount: number = 5;
    private _editable: boolean = true;


    public get editable(): string {
        return `${this._editable}`;
    }

    public set editable(v: string) {
        if (this.editable !== v) {
            this._editable = v === "true";
        }
    }

    constructor() {
        super(true, false);
    }

    connectedCallback() {
        super.connectedCallback();
        this.render();
    }

    render() {
        super.render();
        for (let i = 0; i < this._amount; i++) {
            this.wrapper.innerHTML += `<i class="far fa-star"></i>`;
        }

        this.renderCurrentState();

        if (this._editable) {
            this.registerHoverEvents();
            this.registerClickEvents();
        }
    }


    /*  FILL ALL STARS UNTIL THE HOVERED ONE AND GO
        BACK TO CURRENT STATE AFTER LEAVING WRAPPER
    */
    private registerHoverEvents() {
        this.stars.forEach((node, i) => {
            node.addEventListener("mouseover", () => {
                this.stars.forEach((star, j) => {
                    star.className = this.getStarClass(j <= i);
                })
            });
        });
        this.wrapper.addEventListener("mouseleave", () => {
            this.renderCurrentState();
        });
    }

    /* RENDER CURRENT STATE DEPENDING ON this._score */
    private renderCurrentState() {
        this.stars.forEach((node, i) => {
            node.className = this.getStarClass(i < this._score);
        });
    }

    /**
     * Getting CSS Class for Stars
     * @param {boolean} showFull 
     * @returns {string}
     */
    private getStarClass(showFull: boolean): string {
        return showFull ? STAR_FULL : STAR_OPEN;
    }

    /* SET VALUE FOR this._score DEPENDING ON STAR */
    private registerClickEvents() {
        this.stars.forEach((node, index) => {
            (node as HTMLElement).addEventListener("click", () => {
                this._score = index + 1;
            })
        });
    }

    static get observedAttributes() {
        return ['amount', 'score', 'editable'];
    }

    /**
     * Amount of Stars to click
     * @property {number} amount
     */
    public set amount(val: number | undefined) {
        (val != undefined) ? this._amount = val : this._amount = 5;
    }

    public get amount() {
        return this._amount;
    }

    /**
     * Current Visible Score
     * @property {number} score
     */
    public set score(val: number) {
        this._score = val;
    }

    public get score() {
        return this._score;
    }

    /**
     * Getting Content Elemen
     * @return {HTMLElement}
     */
    private get wrapper() {
        return this.getByIdFromShadowRoot("content") as HTMLElement;
    }

    /**
     * Getting all Stars from DOM
     * @return {NodeListOf<HTMLElement>}
     */
    private get stars() {
        return this.wrapper.querySelectorAll('i');
    }

}
