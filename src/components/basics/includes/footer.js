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
        <footer class="footer is-fixed-bottom has-background-grey-darker">
            <div class="content has-text-centered">
                <p>
                <img src="/assets/imgs/icons/icon-72x72.png" width="28" height="28">
                <strong class="has-text-white">Vet::ProVieh</strong> 
                </p>
            </div>
        </footer>
        `;
    }
}


// Komponente registrieren
customElements.define("vetprovieh-footer", VetproviehFooter);