
export class ProcessMenu extends HTMLElement {

  constructor() {
    super();
  }


  connectedCallback() {
    this._updateRendering();
  }

  /**
   * HTML-Output schreiben
   */
  _updateRendering() {
    this.innerHTML = "<p>Hello World</p>";
  }
}


// Komponente registrieren
customElements.define("process-menu", ProcessMenu);