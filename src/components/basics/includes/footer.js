export class VetproviehFooter extends HTMLElement {

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
        this.innerHTML = `
        <footer class="footer is-fixed-bottom">
            <div class="content has-text-centered">
                <p>
                <strong>vetprovieh</strong> 
                </p>
            </div>
        </footer>
        `;
    }
}


// Komponente registrieren
customElements.define("vetprovieh-footer", VetproviehFooter);