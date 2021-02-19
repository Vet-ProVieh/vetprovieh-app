import { VetproviehElement, WebComponent } from "@tomuench/vetprovieh-shared/lib";
import RecordRTC from "recordrtc";


@WebComponent({
    tag: "recording-modal",
    template: VetproviehElement.template + `
    <div id="modal" class="modal">
        <div class="modal-background"></div>
        <div class="modal-card">
        <header class="modal-card-head">
            <p class="modal-card-title">Aufnahme für \${this.title}</p>
            <button id="closeButton" class="delete" aria-label="close"></button>
        </header>
        <section class="modal-card-body">
            <video id="media" width="600" height="400">
            </video>
        </section>
        <footer class="modal-card-foot"> 
            <div class="field is-grouped">
                \${this.footerButtons}
          </div>
        </footer>
        </div>
    </div>`
})
export class RecordingModal extends VetproviehElement {

    private recorder: RecordRTC | undefined;
    private _recording: boolean = false;
    private _type: string = "video";
    private _active: boolean = false;
    private _title: string = "";

    private _stream: MediaStream | undefined;

    private recordedContent: any | undefined;

    public get title(): string {
        return this._title;
    }

    public set title(v: string) {
        if (this._title !== v) {
            this._title = v;
        }
    }

    public get footerButtons(): string {
        console.log(this.type);
        if (this.type == "video") {
            return `<p class="control">
                        <button class="button is-primary" id="start">Start</button>
                    </p>
                    <p class="control">
                        <button class="button is-danger" id="stop">Stop</button>
                    </p>
                    <p class="control">
                        <button class="button is-primary" id="takeoverButton">Takover</button>
                    </p>`;
        } else {
            return `<p class="control">
                        <button class="button is-primary" id="takeSnapshotButton">Aufnehmen</button>
                    </p>`;
        }
    }

    /**
     * Type Getter
     * @return {string}
     */
    public get type(): string {
        return this._type;
    }

    /**
     * Type Setter
     * @param {string} v
     */
    public set type(v: string) {
        if (this._type !== v) {
            this._type = v;
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
     * Set Recording
     * @param {boolean} v
     */
    private set recording(v: boolean) {
        if (this._recording != v) {
            if (this.startButton) this.startButton.disabled = v;
            if (this.stopButton) this.stopButton.disabled = !v;
            this._recording = v;
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

        switch (this.type) {
            case "video":
                this.addVideoButtons();
                break;
            case "image":
                this.addImageButtons();
                break;

        }
    }

    private addVideoButtons() {

        var _self = this;
        this.startButton.addEventListener("click", () => {
            this.startRecording(_self)
        });
        this.stopButton.addEventListener("click", () => {
            this.stopRecording(_self);
        })

        let closeFuncTakeover = () => {
            this._content = this.recorder?.getBlob() || null;
            this.recordedContent = this._content;
            this.close(true);
        }
        closeFuncTakeover.bind(this);
        this.takeoverButton.addEventListener("click", closeFuncTakeover);

    }

    private addImageButtons() {
        let b = this.getByIdFromShadowRoot("takeSnapshotButton") as HTMLButtonElement;
        let takeSnapshot = () => {
            this.snapshot().then(() => {

                this.close(true);
            })
        }
        takeSnapshot.bind(this);
        b.addEventListener("click", takeSnapshot)
    }

    private snapshot(): Promise<any> {
        return new Promise((resolve, reject) => {
            var canvas = document.createElement('canvas');
            canvas.width = 640;
            canvas.height = 480;
            var ctx = canvas.getContext('2d');
            if (ctx) {
                ctx.drawImage(this.mediaElement, 0, 0, canvas.width, canvas.height);
                this.recordedContent = canvas.toDataURL('image/png');
                canvas.toBlob((blob: Blob | null) => {
                    this._content = blob;
                    resolve();
                })
            }
        })
    }

    private _content: Blob | null = null;

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

            this.recorder = new RecordRTC(stream, {
                type: 'video',
            });
        }

        streamFunc.bind(this);


        navigator.getUserMedia({ video: true, audio: true },
            streamFunc,
            (error) => this.bindingFailed(error));
    }

    private startRecording(self: RecordingModal) {
        self.recorder?.startRecording();
        self.recording = true;
    }

    /**
     * Stop Video-Recording
     * @param {RecordingModal} self
     */
    private stopRecording(self: RecordingModal) {
        self.recorder?.stopRecording();
        self.mediaElement.srcObject = null;
        self.recording = false;
    }

    /**
     * Log binding Error
     * @param {any} error
     */
    private bindingFailed(error: any) {
        console.log(error);
    }

    /**
     * Gettings StartButton
     * @return {HTMLButtonElement}
     */
    private get startButton(): HTMLButtonElement {
        return this.getByIdFromShadowRoot("start") as HTMLButtonElement;
    }

    private get mediaElement(): HTMLVideoElement {
        return this.getByIdFromShadowRoot('media') as HTMLVideoElement;
    }

    /**
    * Gettings StopButton
    * @return {HTMLButtonElement}
    */
    private get stopButton(): HTMLButtonElement {
        return this.getByIdFromShadowRoot("stop") as HTMLButtonElement;
    }


    /**
    * Gettings closeButton
    * @return {HTMLButtonElement}
    */
    private get closeButton(): HTMLButtonElement {
        return this.getByIdFromShadowRoot("closeButton") as HTMLButtonElement;
    }


    /**
    * Gettings takeoverButton
    * @return {HTMLButtonElement}
    */
    private get takeoverButton(): HTMLButtonElement {
        return this.getByIdFromShadowRoot("takeoverButton") as HTMLButtonElement;
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