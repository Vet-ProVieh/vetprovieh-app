export class VetproviehLayout extends HTMLElement {

    constructor() {
        super();
        this._outsideInnerHtml = this.innerHTML;
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
            var button = document.getElementById(menuOrientation +"-menu-open");
            var sideMenu = document.getElementById(menuOrientation +"-menu");
            button.addEventListener("click", () => {
                sideMenu.dispatchEvent(new Event("toggle"));
            });
        })
    }

    /**
     * HTML-Output schreiben
     */
    _updateRendering() {
        this.innerHTML = `
        <link rel="stylesheet" href="/node_modules/bulma/css/bulma.min.css">
        <nav class="navbar is-fixed-top has-shadow has-background-grey-darker" role="navigation" aria-label="main navigation">
            <div class="navbar-brand">
                <a class="navbar-item" href="/">
                <img src="/assets/imgs/icons/icon-72x72.png" width="28" height="28">
                </a>
            </div>
            <button id="left-menu-open">open Left</button>
            <button id="right-menu-open">open right</button>
        </nav>
        <side-menu id="left-menu" width="300px">
        <h2> LEFT </h2>
            <ul>
                <li><a href="#">Item 1</a></li>
                <li><a href="#">Item 2</a></li>
                <li><a href="#">Item 3</a></li>
            </ul>
        </side-menu>
        <side-menu id="right-menu" orientation="right" width="300px">
        <h2> Right </h2>
            <ul>
                <li><a href="#">Item 1</a></li>
                <li><a href="#">Item 2</a></li>
                <li><a href="#">Item 3</a></li>
            </ul>
        </side-menu>
        <section class="section">
            <div class="container">
            ` + this._outsideInnerHtml + `
            </div>
        </section>
        
        <vetprovieh-footer></vetprovieh-footer>
            `;
    }
}


// Komponente registrieren
customElements.define("vetprovieh-layout", VetproviehLayout);