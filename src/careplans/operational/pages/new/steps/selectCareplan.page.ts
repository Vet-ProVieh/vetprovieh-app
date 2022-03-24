import {VetproviehNavParams, WebComponent} from '@tomuench/vetprovieh-shared/lib';
import {BarnListShow} from '../../../../../barns';

// eslint-disable-next-line new-cap
@WebComponent({
  template: '',
  tag: 'select-careplans-page',
})
/**
 * Select a Careplan as a Page
 */
export class SelectCareplanPage extends HTMLElement {
  constructor() {
    super();
  }

  connectedCallback() {
    this.barnShower.attributeChangedCallback('barnid', '', VetproviehNavParams.getUrlParameter('barn_id'));
  }


  /**
     * Get BarnShower
     * @return {BarnListShow}
     */
  private get barnShower() : BarnListShow {
    return document.getElementById('barnShower') as BarnListShow;
  }
}
