
import { VetproviehElement, VetproviehNavParams } from "@tomuench/vetprovieh-shared/lib";

/**
 * Basic-Select-Page
 * Child musst insert the following:
 * - takeoverButton - Button with id="takeoverButton" to navigateBack with params
 * - abortbutton - Button with id="abortButton" to navigateBack without params
 */
export class BasicSelectPage extends VetproviehElement {

    public static PARAM_KEY = "selectPage.return";

    constructor() {
        super(false, false);
    }

    connectedCallback() {
        this.render();
        this.registerEventListener();
    }


    /**
     * Return Value
     * @return {any}
     */
    protected get returnValue(): any {
        throw new Error("Must be implemented in child");
    }

    /**
     * Register different Event-Listener
     */
    private registerEventListener() {
        this.abortButton.addEventListener('click', () => {
            this.navigateBack();
        });

        this.takeoverButton.addEventListener('click', () => {
            if (this.hasSelectedItems()) {
                this.setReturnValue();
                this.navigateBack();
            } else {
                alert("Es wurden keine Einträge markiert");
            }
        })
    }

    /**
     * Navigate Back and set params
     */
    protected navigateBack() {
        window.location.href = this.returnUrl;
    }

    /**
   * ReturnUrl to Navigate
   * @return {string}
   */
    private get returnUrl(): string {
        return VetproviehNavParams.getUrlParameter("returnUrl")
    }

    /**
     * Checks if items where selcted
     * @returns {boolean}
     */
    protected hasSelectedItems(): boolean {
        return Array.isArray(this.returnValue) && this.returnValue.length > 0 || 
        !Array.isArray(this.returnValue) && this.returnValue != undefined;
    }


    /**
     * Setting ReturnValue
     */
    private setReturnValue() {
        let current: Array<any> = VetproviehNavParams.get(BasicSelectPage.PARAM_KEY)
        if (!Array.isArray(current) || current == null || current == undefined) current = [];
        current.push(this.returnValue);
        VetproviehNavParams.set(BasicSelectPage.PARAM_KEY, current);
    }


    /**
     * Load Takeover-Button from DOM
     * @return {HTMLButtonElement}
     */
    private get takeoverButton(): HTMLButtonElement {
        return document.getElementById("takeoverButton") as HTMLButtonElement;
    }

    /**
     * Load Abort-Button from DOM
     * @return {HTMLButtonElement}
     */
    private get abortButton(): HTMLButtonElement {
        return document.getElementById("abortButton") as HTMLButtonElement;
    }


}