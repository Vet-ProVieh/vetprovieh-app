import { VetproviehElement, VetproviehNavParams, WebComponent } from "@tomuench/vetprovieh-shared/lib";
import { BasicSelectPage } from "../pages";

@WebComponent({
    template: 
        VetproviehElement.template + `
        <a href="\${this.href}&returnUrl=\${this.currentAbsoluteUrl}" class="button is-link is-fullwidth">
            <span class="icon is-small">
                <i class="fas fa-search"></i>
            </span>
            <span>\${this.name}</span>
        </a>
    `,
    tag: `select-button`
})
export class SelectButton extends VetproviehElement {

    public href: string = "";
    public name: string = "";
    public param: string = "";

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
        let paramKey = this.getParam();
        console.log(paramKey);
        let params: Array<any> = VetproviehNavParams.get(paramKey);
        if (params && Array.isArray(params)) {
            let lastParam = params.pop();
            VetproviehNavParams.set(paramKey, params);
            return lastParam;
        } else {
            return undefined;
        }
    }

    private getParam(): string {
        if(this.param != "" && this.param != null && this.param != undefined){
            return this.param;
        } else {
            return BasicSelectPage.PARAM_KEY;
        }
    }

    /**
     * Observed-Attributes
     * @return {string[]}
     */
    static get observedAttributes(): string[] {
        return ['href', 'name', 'param'];
    }

    /**
     * Get current absolut-Url
     * @return {string}
     */
    private get currentAbsoluteUrl(): string {
        return window.location.pathname;
    }
}