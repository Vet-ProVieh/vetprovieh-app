/**
 * Footer for Webapplication
 */
export class VetproviehFooter extends HTMLElement {
  /**
     * Defining Template
     */
  static get template() : string {
    return `
        <footer class="is-fixed-bottom has-background-vetprovieh-blue">
            <div class="content has-text-centered">
                <p>
                <img src="/assets/imgs/icons/icon-72x72.png"  alt="Vetprovieh lgoo"
                width="28" height="28">
                <strong class="has-text-white">Vet::ProVieh</strong> 
                </p>
            </div>
        </footer>
        `;
  }

  /**
     * Constructor
     */
  constructor() {
    super();
  }


  /**
     * Callback after Loading
     */
  connectedCallback() {
    this._updateRendering();
  }

  /**
     * HTML-Output schreiben
     */
  _updateRendering() {
    this.innerHTML = VetproviehFooter.template;
  }
}


// Komponente registrieren
customElements.define('vetprovieh-footer', VetproviehFooter);
