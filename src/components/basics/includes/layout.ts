export class VetproviehLayout extends HTMLElement {

    static get observedAttributes() {
        return ["title"];
    }

    constructor() {
        super();
        /**
         * @type {!Object}
         * @private
         */
        this._properties = {
            outsideInnerHtml: this.innerHTML,
            title: "No Title Set"
        };

        let _this = this;
        document.addEventListener("DOMContentLoaded", function(event) {
            _this._deactivatePageLoader();
        });
    }

    /**
     * Callback for Attributes
     * @param {*} name
     * @param {*} oldValue
     * @param {*} newValue
     */
    attributeChangedCallback(name, old, value) {
        if (old !== value) {
            this[name] = value;
        }
    }

    /**
     * PUBLIC
     * Getter for title of current layout
     */
    get title() {
        return this._properties.title;
    }

    /**
     * PUBLIC
     * Setter for title of current layout
     */
    set title(val) {
        if (val !== this.title) {
            this._properties.title = val;
            this._updateRendering();
        }
    }

    connectedCallback() {
        this._addCssClassToBody();
        this._updateRendering();
        this._addListenerToButton();
    }

    /**
     * CSS-Klasse an das Body-Element hängen, so dass Header fixed ist.
     */
    _addCssClassToBody() {
        document.getElementsByTagName("body")[0].classList.add('has-navbar-fixed-top');
    }

    _addListenerToButton() {
        ["left", "right"].forEach((menuOrientation) => {
            var button = document.getElementById(menuOrientation + "-menu-open");
            var sideMenu = document.getElementById(menuOrientation + "-menu");
            button.addEventListener("click", (event) => {
                sideMenu.dispatchEvent(new Event("toggle"));
            });
        })
    }

    /**
     * Hide pageloader
     * @private
     */
    _deactivatePageLoader() {
        let element = document.getElementById("pageloader");
        setTimeout(
            (_) =>element.classList.remove("is-active"),
            500)
    }

    /**
     * HTML-Output schreiben
     * @private
     */
    _updateRendering() {
        this.innerHTML = `
        <div id="pageloader" class="pageloader is-active has-background-vetprovieh-light-blue"><span class="title">Ihre Daten werden geladen...</span></div>
        <nav class="navbar is-fixed-top has-shadow has-background-vetprovieh-light-blue" role="navigation" aria-label="main navigation">
            <div class="navbar-brand">
                <a id="left-menu-open" class="navbar-item has-text-white" >
                    <i class="fas fa-bars"></i>
                </a>
            </div>
            <div class="navbar-item navbar-center">
                <h1 id="title" class="has-text-white">` + this.title + `</h1>
            </div>
           <!-- <button id="right-menu-open">open right</button> -->
        </nav>
        <vetprovieh-sidemenu id="left-menu" width="300px">
            <aside class="menu">
                <div >
                    <div class="card-content">
                        <div class="media">
                          <div class="media-left">
                            <figure class="image is-48x48">
                              <img src="https://bulma.io/images/placeholders/96x96.png" alt="Placeholder image">
                            </figure>
                          </div>
                          <div class="media-content">
                            <p class="title is-5">Stephan Göken</p>
                            <p class="subtitle is-7">Gemeinschaftspraxis Göken & Braune</p>
                          </div>
                        </div>
                    </div>
                </div>
                <p class="menu-label">
                   Behandlung
                </p>
                <ul class="menu-list">
                    <li><a href="#">Behandlungen</a></li>
                </ul>
                
                <p class="menu-label">
                   Persönliche Einstellungen
                </p>
                <ul class="menu-list">
                    <li><a href="#">Mein Profil</a></li>
                    <li><a href="#">Benachrichtigungen</a></li>
                    <li><a href="#">Termine</a></li>
                </ul>
            
                <p class="menu-label">
                  Meine Stammdaten
                </p>
                <ul class="menu-list">
                    <li><a href="/farmers/index.html">Landwirte</a></li>
                    <li><a href="/barns/index.html">Ställe</a></li>
                </ul>
                <p class="menu-label">
                  Meine Praxis
                </p>
                <ul class="menu-list">
                    <li><a href="#">Basisdaten</a></li>
                    <li><a href="#">Benutzer</a></li>
                    <li><a href="#">Behandlungspläne</a></li>
                </ul>
                
            </aside>
        </vetprovieh-sidemenu>
      <!--  <vetprovieh-sidemenu id="right-menu" orientation="right" width="300px">
        <h2> Right </h2>
            <ul>
                <li><a href="#">Item 1</a></li>
                <li><a href="#">Item 2</a></li>
                <li><a href="#">Item 3</a></li>
            </ul>
        </vetprovieh-sidemenu> -->
        <section class="section full-height">
            <div class="container">
            ` + this._properties.outsideInnerHtml + `
            </div>
        </section>
        
        <vetprovieh-footer></vetprovieh-footer>
            `;
    }
}


// Komponente registrieren
customElements.define("vetprovieh-layout", VetproviehLayout);