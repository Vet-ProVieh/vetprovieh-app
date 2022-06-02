import {
  VetproviehNavParams,
  WebComponent,
} from '@vetprovieh/vetprovieh-shared';
import * as bulmaToast from 'bulma-toast';
import {BarnListShow} from '../../../barns';
import {BasicShowPage} from '../../../shared/components/pages/showPage';
import {Document} from '../../models';
import {DocumentRepository} from '../../repository';

// eslint-disable-next-line new-cap
@WebComponent({
  tag: 'document-create',
  template: ``,
})
/**
 * Document create Page
 */
export class DocumentCreatePage extends BasicShowPage {
    private repository = new DocumentRepository();

    /**
     * Connected-Callback
     */
    connectedCallback() {
      this.bindUploadButton();
      this.bindFileInput();
      this.bindBackButton();

      setTimeout(() => {
        this.barnShower.attributeChangedCallback(
            'barnid',
            '',
            VetproviehNavParams.getUrlParameter('barnId'));
      }, 300);
    }

    /**
     * getter barnId
     * @return {string}
     */
    private get barnId(): string {
      return VetproviehNavParams.getUrlParameter('barnId');
    }

    /**
     * Binding Upload-Button
     */
    private bindUploadButton() {
      const uploadFunc = () => {
        this.uploadButton.disabled = true;
        this.generateAndSendDocuments((document) => {
          return new Promise((resolve, reject) => {
            this.repository.create(document).then((result) => {
              resolve(result);
            }).catch((error) => {
              reject(error);
            });
          });
        });
      };
      uploadFunc.bind(this);

      this.uploadButton.addEventListener('click', uploadFunc);
    }

    /**
     * Bind file Input to enable or disable button
     */
    private bindFileInput() {
      this.fileInput.addEventListener('change', () => {
        if (this.fileInput.files) {
          this.uploadButton.disabled = this.fileInput.files===null ||
          (this.fileInput.files.length <= 0);
        }
      });
    }

    /**
     * Back Button binden
     */
    private bindBackButton() {
      this.backButton.addEventListener('click', () => {
        window.history.back();
      });
    }

    /**
     * Resetting Form
     */
    private reset() {
      this.fileInput.value = '';
      if (!/safari/i.test(navigator.userAgent)) {
        this.fileInput.type = '';
        this.fileInput.type = 'file';
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
        position: 'bottom-center',
        animate: {in: 'fadeIn', out: 'fadeOut'},
      });
    }

    /**
     * Generating Document for send
     * @param {any} sendFunction
     */
    private generateAndSendDocuments(
        sendFunction: (doc: Document) => Promise<any>
    ) {
      const input = this.fileInput;
      const promises = [];
      if (input && input.files) {
        for (let i = 0; i < input.files.length; i++) {
          const file: File = input.files[i];
          const document = new Document();
          document.name = file.name;
          document.barnId = this.barnId;
          document.content = file;
          document.tags = ['document'];
          promises.push(sendFunction(document));
        }
      }

      Promise.all(promises).then(() => {
        this.reset();
        this.showSuccess();
      }).catch((error) => {
        console.warn(error);
      });
    }


    /**
     * Get BarnShower
     * @return {BarnListShow}
     */
    private get barnShower(): BarnListShow {
      return document.getElementById('barnShower') as BarnListShow;
    }

    /**
     * Uploadbutton
     * @return {HTMLButtonElement}
     */
    private get uploadButton(): HTMLButtonElement {
      return document.getElementById('upload') as HTMLButtonElement;
    }

    /**
     * Back-Button
     * @return {HTMLButtonElement}
     */
    private get backButton(): HTMLButtonElement {
      return document.getElementById('back') as HTMLButtonElement;
    }

    /**
     * File Upload Input
     * @return {HTMLInputElement}
     */
    private get fileInput(): HTMLInputElement {
      return document.getElementById('fileInput') as HTMLInputElement;
    }
}
