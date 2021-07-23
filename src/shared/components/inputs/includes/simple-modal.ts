import { VetproviehElement } from "@tomuench/vetprovieh-shared/lib";

export class SimpleModal extends VetproviehElement {
    private _active: boolean = false;
    private _title: string = "";
    protected _content: Blob | null = null;


    protected isMobile: boolean = !!navigator.userAgent.match(/(iPad)|(iPhone)|(iPod)|(android)|(webOS)/i);

    public get title(): string {
        return this._title;
    }

    public set title(v: string) {
        if (this._title !== v) {
            this._title = v;
        }
    }

    /**
     * Getter Active
     * @return {boolean}
     */
    public get active(): boolean {
        return this._active;
    }

    /**
     * Setter Active
     * @param {boolean} v
     */
    public set active(v: boolean) {
        if (this._active !== v) {
            this._active = v;
            if (v) {
                this.modalBox.classList.add("is-active");
            } else {
                this.modalBox.classList.remove("is-active");
            }
        }
    }


    /**
     * Conencted-Callback
     * - Bindings and so on
     */
    connectedCallback() {
        super.connectedCallback();

        let closeFunc = () => {
            this.close();
        }
        closeFunc.bind(this);
        this.closeButton.addEventListener("click", closeFunc);

        this.addButtonListeners();
    }

    /**
     * Adding Listener to Buttons
     */
    protected addButtonListeners() {
        throw "Please implement";
    }

    /**
     * Get Content from Modal
     */
    public loadContent(): Blob | null {
        return this._content;
    }

    /**
     * Closing Modal
     * @param {boolean} takeover
     */
    public close(takeover: boolean = false) {
        this.active = false;

        this.dispatchEvent(new CustomEvent("close"));
        this.reset();
    }

    /**
     * Overwrite in Subclasses
     * Resets Modal
     */
    protected reset() {
        
    }

    /**
     * Get Save-Button
     */
    protected get saveButton(): HTMLButtonElement {
        return this.shadowRoot?.getElementById("save") as HTMLButtonElement;
    }


    /**
    * Gettings closeButton
    * @return {HTMLButtonElement}
    */
    private get closeButton(): HTMLButtonElement {
        return this.getByIdFromShadowRoot("closeButton") as HTMLButtonElement;
    }

    /**
     * Getting ModalBox
     * @return {HTMLElement}
     */
    private get modalBox(): HTMLElement {
        return this.getByIdFromShadowRoot("modal") as HTMLElement;
    }

    /**
     * Observed Attributes
     */
    static get observedAttributes() {
        return ['type', 'title'];
    }

}