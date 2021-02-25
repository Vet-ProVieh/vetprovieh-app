import { VetproviehElement } from "@tomuench/vetprovieh-shared/lib";

export class RecordingModal extends VetproviehElement {
    private _active: boolean = false;
    private _title: string = "";
    protected _content: Blob | null = null;

    protected _stream: MediaStream | undefined;

    protected recordedContent: any | undefined;

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
                this.startVideo();
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
        this.closeButton.addEventListener("click", closeFunc)

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

        // Dispatching Changed Event
        let event = new CustomEvent("change", {
            detail: {
                takeover: takeover,
                content: takeover ? this.recordedContent : undefined
            }
        });
        this.closeStreams();
        this.dispatchEvent(event);
        this.reset();
    }

    /**
     * Overwrite in Subclasses
     * Resets Modal
     */
    protected reset() {
        
    }

    private closeStreams() {
        console.log("Stopping open Streams");
        this.mediaElement.srcObject = null;

        this._stream?.getTracks().forEach((track) => {
            if (track.readyState == 'live') {
                track.stop();
            }
        })
        this._stream = undefined;
    }

    /**
     * Starting Video
     */
    private startVideo() {
        let streamFunc = (stream: MediaStream) => {
            this.mediaElement.autoplay = true;
            this.mediaElement.srcObject = stream;
            this._stream = stream;

            this.afterStreamStarted(stream);
        }

        streamFunc.bind(this);

        let videoOptions: any = true;

        if(this.isMobile){
            videoOptions = {
                facingMode: "environment"
            }
        }
        navigator.getUserMedia({ 
            video: videoOptions, 
            audio: true },
            streamFunc,
            (error) => this.bindingFailed(error));
    }

    protected afterStreamStarted(stream: MediaStream){

    }

    /**
     * Log binding Error
     * @param {any} error
     */
    private bindingFailed(error: any) {
        console.log(error);
    }


    protected get mediaElement(): HTMLVideoElement {
        return this.getByIdFromShadowRoot('media') as HTMLVideoElement;
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