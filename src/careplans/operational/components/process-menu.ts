import { VetproviehBasicRepeat, VetproviehElement, WebComponent } from "@tomuench/vetprovieh-shared/lib";

/**
 * Process-Menu 
 * is used to display the right menu inside some process.
 */
@WebComponent({
  template: VetproviehElement.template + `
  <aside class="menu">
    <ul id="listElements" class="menu-list">    
    </ul>
  </aside>`,
  tag: 'process-menu'
})
export class ProcessMenu extends VetproviehBasicRepeat {

  constructor() {
    super(ProcessMenu.listTemplate);
  }

  /**
   * Connected Callback
   */
  connectedCallback() {
    this._initalizeShadowRoot(this.template);
    this.renderList();
  }


  static get listTemplate(): HTMLTemplateElement {
    let template = document.createElement("template");
    let currentUrl = new URL(window.location.href);

    if (currentUrl.searchParams.has("groupsId")) {
      currentUrl.searchParams.delete("groupsId");
    }
    currentUrl.searchParams.append("groupsId", '')

    let urlString = currentUrl.toString();
    urlString = urlString.replace("groupsId=", "groupsId={{index}}");

    template.innerHTML = `
                        <li>
                            <a href="`+ urlString + `">
                                {{position}}. {{name}}
                            </a>
                        </li>
    `;
    return template;
  }
}
