import { VetproviehElement, VetproviehNavParams, WebComponent } from "@tomuench/vetprovieh-shared/lib";
import { BasicSelectPage } from "../pages";

@WebComponent({
    template: `
        <a href="\${this.href}?returnUrl=\${this.currentAbsoluteUrl}" class="button is-link">
        \${this.name}
        </a>
    `,
    tag: `select-button`
})
export class SelectButton extends VetproviehElement {

    public href: string = "";
    public name: string = "";
    private _recievedParam: any;

    public get recievedParam() : any {
        return this._recievedParam;
    }

    connectedCallback() {

        this.setRecievedParam();
    }

    /**
     * Found Param, send Event outside
     */
    private setRecievedParam() {
        let data = this.popLastParam();
        if (data) {
            this._recievedParam = data;
        }
    }

    /**
     * Get last parameter and pop it out
     * @returns {any}
     */
    private popLastParam(): any {
        let params: Array<any> = VetproviehNavParams.get(BasicSelectPage.PARAM_KEY);
        if (params && Array.isArray(params)) {
            let lastParam = params.pop();
            VetproviehNavParams.set(BasicSelectPage.PARAM_KEY, params);
            return lastParam;
        } else {
            return undefined;
        }
    }

    /**
     * Observed-Attributes
     * @return {string[]}
     */
    static get observedAttributes(): string[] {
        return ['href', 'name'];
    }

    /**
     * Get current absolut-Url
     * @return {string}
     */
    private get currentAbsoluteUrl(): string {
        return window.location.pathname;
    }
}