import { VetproviehElement } from "@tomuench/vetprovieh-shared/lib";
import { Document, DocumentRepository } from "../../../../documents";
import { RecordingModal } from "./recording-modal";

/**
 * Media Element. 
 * Abstract Class for Video, Image and Speech
 */
export class VetproviehMedia extends VetproviehElement {

    private _type: string = "video";
    private _name: string = "";
    private _barnid : string = "";
    private _thumbnail: string | undefined;
    private _repository: DocumentRepository = new DocumentRepository();
    private _value: string | undefined;

    constructor() {
        super(true, false);
    }

    public static get template() {
        return VetproviehElement.template + `
        <div>
            <div id="content" class="card-content">
                \${this.content}
            </div>
            <footer class="card-footer" style="border-top: 0px">
                <div class="field" style="width:100%">
                \${this.openButton}
                </div>
            </footer>
        </div>
        <recording-\${this.type}-modal id="recordingModal" title="\${this.name}" active="false"></recording-\${this.type}-modal>
        `
    }

    /**
     * Sending Dokument to Server
     * @param {string} filename
     */
    protected sendToServer(filename: string) {
        let document = new Document();
        document.barnId = this.barnid;
        document.content = this.recordingModal.loadContent();
        document.name = filename;
        this._repository.create(document).then((url) => {
            this.value = url;
        });
    }

    
    /**
     * Getter barnid
     * @return {string}
     */
    public get barnid() : string {
        return this._barnid;
    }

    /**
     * Setter barnid
     * @param {string} v
     */
    public set barnid(v : string) {
        if(this._barnid !== v) {
            this._barnid = v;
        }    
    }

    /**
     * Getter value
     * @return {string | undefined}
     */
    public get value(): string | undefined {
        return this._value;
    }

    /**
     * Setter value
     * @param {string | undefined} v
     */
    public set value(v: string | undefined) {
        if (this._value !== v && v !== undefined) {
            this._value = v;
            this._thumbnail = v;
            this.renderContentBox();
            this.dispatchEvent(new Event("change"));
        }
    }

    /**
     * Getter name
     * @return {string}
     */
    public get name(): string {
        return this._name;
    }

    /**
     * Setter name 
     * @param {string} v
     */
    public set name(v: string) {
        if (this._name !== v) {
            this._name = v;
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
     * Getting Base64 Encoded Thumbnail to Show
     * @return {string | undefined}
     */
    protected get thumbnail(): string | undefined {
        return this._thumbnail;
    }

    protected set thumbnail(v: string | undefined) {
        if(this._thumbnail !== v){
            this._thumbnail = v;
        }
    }

    /**
     * Connected-Callback
     */
    public connectedCallback() {
        this.render();
        this.attachListener();
    }


    /**
     * Rendering Content
     * @return {string}
     */
    protected get content(): string {
        return "<p>Es wurde noch nichts aufgenommen.</p>";
    }

    /**
     * Rendering Open-Button
     * @return {string}
     */
    protected get openButton(): string {
        return `<button id="openButton" class="button is-pulled-right">${this.buttonname} aufnehmen</button>`
    }

      /**
     * Generate Button name
     * @return {string}
     */
    protected get buttonname(): string {
        return "Unknown";
    }


    /**
     * Getting RecordingModal
     * @return {RecordingModal}
     */
    private get recordingModal(): RecordingModal {
        return this.getByIdFromShadowRoot("recordingModal") as RecordingModal;
    }

    /**
     * Attaching Event-Listener to Contnet
     */
    private attachListener() {
        this.bindOpenButton();
        this.bindModal();
    }

    /**
     * Binding OpenButton
     */
    private bindOpenButton() {
        let button = this.getByIdFromShadowRoot("openButton") as HTMLButtonElement;
        let clickFunction = () => {
            console.log("Activating Recording modal");
            this.recordingModal.active = true;
        }
        clickFunction.bind(this);
        button.addEventListener("click", clickFunction);
    }

    /**
     * Binding Modal
     */
    private bindModal() {
        let modalCloseFunction = (event: any) => {
            if (event.detail.takeover) {
                this.afterModalClose(event);
                this.sendToServer(this.generateFilename());
            }
        }
        modalCloseFunction.bind(this);
        this.recordingModal.addEventListener("change", modalCloseFunction);
    }

    /**
     * Generating a filename
     * @return {string}
     */
    protected generateFilename() : string {
        return `barn_${this.barnid}_${this.buttonname}`;
    }
 
    /**
     * Rendering ContentBox again
     */
    protected renderContentBox() {
        let contentBox = this.getByIdFromShadowRoot("content")
        if (contentBox) contentBox.innerHTML = this.content;
    }

    /**
     * After Recording Modal is closed
     * @param {any} event 
     */
    protected afterModalClose(event:any) {

    }
}