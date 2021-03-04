import { VetproviehNavParams, WebComponent } from "@tomuench/vetprovieh-shared/lib";
import * as bulmaToast from 'bulma-toast';
import { BarnListShow } from "../../../barns";
import { BasicShowPage } from "../../../shared/components/pages/showPage";
import { Document } from "../../models";
import { DocumentRepository } from "../../repository";

@WebComponent({
    tag: 'document-create',
    template: ``
})
export class DocumentCreatePage extends BasicShowPage {


    private repository = new DocumentRepository();

    connectedCallback() {
        this.bindUploadButton();
        this.bindFileInput();
        this.bindBackButton();

        setTimeout(() => {
            this.barnShower.attributeChangedCallback("barnid", "", VetproviehNavParams.getUrlParameter("barnId"));
        }, 300);
    }

    private get barnId(): string {
        return VetproviehNavParams.getUrlParameter("barnId");
    }

    /**
     * Binding Upload-Button
     */
    private bindUploadButton() {
        let uploadFunc = () => {
            this.uploadButton.disabled = true;
            this.generateAndSendDocuments((document) => {
                return new Promise((resolve, reject) => {
                    this.repository.create(document).then((result) => {
                        resolve(result);
                    }).catch((error) => {
                        reject(error);
                    })
                });
            });
        };
        uploadFunc.bind(this);

        this.uploadButton.addEventListener("click", uploadFunc);
    }

    /**
     * Bind file Input to enable or disable button
     */
    private bindFileInput() {
        this.fileInput.addEventListener("change", () => {
            if(this.fileInput.files){
                this.uploadButton.disabled = this.fileInput.files == null || !(this.fileInput.files.length > 0)
            }
        })
    }

    /**
     * Back Button binden
     */
    private bindBackButton() {
        this.backButton.addEventListener("click", () => {
            window.history.back();
        })
    }

    /**
     * Resetting Form
     */
    private reset() {
        this.fileInput.value = "";
        if (!/safari/i.test(navigator.userAgent)) {
            this.fileInput.type = ""
            this.fileInput.type = "file";
        }
    }

    /**
     * Show Success Toast
     */
    private showSuccess() {
        bulmaToast.toast({
            message: 'Dateien wurden erfolgreich hochgeladen',
            type: 'is-success',
            dismissible: false,
            position: "bottom-center",
            animate: { in: 'fadeIn', out: 'fadeOut' },
        })
    }

    /**
     * Generating Document for send
     */
    private generateAndSendDocuments(sendFunction: (doc: Document) => Promise<any>) {
        let input = this.fileInput;
        let promises = []
        if (input && input.files) {
            console.log(input.files);
            for (let i = 0; i < input.files.length; i++) {
                const file: File = input.files[i];
                let document = new Document();
                document.name = file.name
                document.barnId = this.barnId;
                document.content = file;
                promises.push(sendFunction(document));
            }
        }

        Promise.all(promises).then((result) => {
            this.reset();
            this.showSuccess();
        }).catch((error) => {

        })
    }


    /**
     * Get BarnShower
     * @return {BarnListShow}
     */
    private get barnShower(): BarnListShow {
        return document.getElementById("barnShower") as BarnListShow;
    }

    /**
     * Uploadbutton 
     * @return {HTMLButtonElement}
     */
    private get uploadButton(): HTMLButtonElement {
        return document.getElementById("upload") as HTMLButtonElement;
    }

     /**
     * Back-Button
     * @return {HTMLButtonElement}
     */
    private get backButton(): HTMLButtonElement {
        return document.getElementById("back") as HTMLButtonElement;
    }

    /**
     * File Upload Input
     * @return {HTMLInputElement}
     */
    private get fileInput(): HTMLInputElement {
        return document.getElementById("fileInput") as HTMLInputElement;
    }
}