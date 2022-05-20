import {
  VetproviehNavParams,
  WebComponent} from '@tomuench/vetprovieh-shared/lib';
import {BarnListShow} from '../../../barns';
import {BasicIndexPage} from '../../../shared/components/pages';
import {Document} from '../../models';
import {DocumentRepository} from '../../repository';

// eslint-disable-next-line new-cap
@WebComponent({
  template: '',
  tag: 'vetprovieh-documents',
})
/**
 * Document-Index-Page
 */
export class DocumentsIndexPage extends BasicIndexPage<Document> {
    private barnId: string;

    /**
     * Default-Constructor
     */
    constructor() {
      const rep = new DocumentRepository();
      const barnId = VetproviehNavParams.getUrlParameter('barnId');
      rep.barnId = barnId;
      super(rep);
      this.barnId = barnId;
    }

    /**
     * Connected-Callback
     */
    connectedCallback() {
      super.connectedCallback();

      setTimeout(() => {
        this.barnShower.attributeChangedCallback(
            'barnid',
            '',
            VetproviehNavParams.getUrlParameter('barnId'));
      }, 300);

      this.getVetproviehList().addEventListener('selected', (event) => {
        const e = event as CustomEvent;
        (this.repository as DocumentRepository).downloadAndOpen(e.detail.id);
      });

      this.createLink.href += `?barnId=${this.barnId}`;
    }


    /**
     * Get BarnShower
     * @return {BarnListShow}
     */
    private get barnShower() : BarnListShow {
      return document.getElementById('barnShower') as BarnListShow;
    }

    /**
     * Get CreateLink
     * @return {HTMLAnchorElement}
     */
    private get createLink() : HTMLAnchorElement {
      return document.getElementById('createLink') as HTMLAnchorElement;
    }
}
