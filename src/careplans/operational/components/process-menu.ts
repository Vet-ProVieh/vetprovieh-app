import {
  VetproviehBasicRepeat,
  VetproviehElement,
  WebComponent,
} from '@vetprovieh/vetprovieh-shared';


// eslint-disable-next-line new-cap
@WebComponent({
  template: VetproviehElement.template + `
  <aside class="menu">
    <ul id="listElements" class="menu-list">
    </ul>
  </aside>`,
  tag: 'process-menu',
})
/**
 * Process-Menu
 * is used to display the right menu inside some process.
 */
export class ProcessMenu extends VetproviehBasicRepeat {
  /**
   * Default-Constructor
   */
  constructor() {
    super(specialListTemplate());
  }

  /**
   * Connected Callback
   */
  connectedCallback() {
    this._initalizeShadowRoot(this.template);
    this.renderList();
  }


  /**
   * Activate Element by Id
   * @param {number} id
   */
  public activateElement(id: number) {
    const param = (id===0 ? '' : id);
    const search = '[href*=\'groupsId=' + param + '\']';
    const link = this.shadowRoot?.querySelector(search);
    if (link) {
      link.classList.add('is-active');
    }
  }
}


/**
* Creating List-Template
* @return {HTMLTemplateElement}
*/
function specialListTemplate(): HTMLTemplateElement {
  const template = document.createElement('template');
  const currentUrl = new URL(window.location.href);

  if (currentUrl.searchParams.has('groupsId')) {
    currentUrl.searchParams.delete('groupsId');
  }
  currentUrl.searchParams.append('groupsId', '');

  let urlString = currentUrl.toString();
  urlString = urlString.replace('groupsId=', 'groupsId={{index}}');

  template.innerHTML = `
                     <li>
                         <a href="`+ urlString + `">
                             {{position}}. {{name}}
                         </a>
                     </li>
 `;
  return template;
}
