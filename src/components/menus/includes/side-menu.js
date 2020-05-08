// Side-Menu-Komponente
// dient als Wrapper für mögliche SideMenus
export class SideMenu extends HTMLElement {


  static get observedAttributes() {
    return ["width", "orientation"];
  }

  constructor() {
    super();
    // Write HTML from Outside to a var.
    this._outsideInnerHtml = this.innerHTML;

    // Set Default-Values
    this._width = '300px';
    this.attributeChangedCallback("orientation",null,"left");

    this._basicCssStyle = `side-menu nav{
                            position: fixed;
                            top: 0;
                            z-index: 100;
                            height: 100%;
                            padding: .5rem 1rem;
                            box-shadow: 0 6px 12px rgba(107, 82, 82, 0.3);
                            background-color: white;
                            -webkit-box-sizing: border-box;
                            -moz-box-sizing: border-box;
                            box-sizing: border-box;
                            transition: ease 0.2s all;
                        }
                          
                          side-menu div.body-overlay {
                            width: 100vw;
                            height: 100vh;
                            display: none;
                            position: fixed;
                            z-index: 3;
                            top: 0;
                            overflow: hidden;
                            background: rgba(0, 0, 0, 0.5);
                        }
                      `;
  }

  /**
   * Listining to Callback
   */
  connectedCallback() {
    this._updateRendering();
    this._addListener();
  }

  /**
   * Callback for Attributes
   * @param {*} name 
   * @param {*} oldValue 
   * @param {*} newValue 
   */
  attributeChangedCallback(name, oldValue, newValue) {
    try {
      if (newValue) {
        this["_" + name] = newValue;

        if(name == "orientation"){
          this.classList.remove("left");
          this.classList.add(newValue);
        }
      }
      this._updateRendering();
    } catch (ex) {
      console.log("Side-Menu: I could not render new Attribute for " + name);
      console.log(ex);
    }
  }

  /**
   * PUBLIC
   * Getter for Width of the Popup-Menu
   */
  get width() {
    this._width;
  }

  /**
   * PUBLIC 
   * Setter for Widh of the Popup-Menu
   */
  set width(v) {
    this.setAttribute("width", v);
  }

  /**
   * PUBLIC
   * Getter for Orientation of the Popup-Menu
   */
  get orientation() {
    this._orientation;
  }

  /**
   * PUBLIC 
   * Setter for Orientation of the Popup-Menu
   */
  set orientation(v) {
    this.setAttribute("orientation", v);
  }

  /**
   * PUBLIC
   * Menü öffnen/schließen
   */
  toggleMenu() {
    if (!this.classList.contains("open")) {
      this.classList.add("open");
    } else {
      this.classList.remove("open");
    }
  }

  /**
   * PRIVATE
   * Add EventListener to Component
   */
  _addListener() {
    this.addEventListener('toggle', this.toggleMenu);
    document.getElementById("body-overlay-" + this._orientation).addEventListener("click", (_) => this.toggleMenu());
  }

  /**
   * PRIVATE
   * Writing HTML-Output
   */
  _updateRendering() {
    this.innerHTML = `
    <style>
      ` + this._basicCssStyle + `

      side-menu.` + this._orientation + ` nav{
        width: ` + this._width + `;
        ` + this._orientation + `: -` + this._width + `;
      }

      body side-menu.open div.body-overlay {
        display: block;
      }

      body side-menu.open nav{
        ` + this._orientation + `: 0;
      }
    </style>
    <div id="body-overlay-` + this._orientation + `" class="body-overlay"></div>
    <nav role="navigation">            
    ` + this._outsideInnerHtml + `
    </nav>`;
  }
}


// 2. Komponente registrieren
customElements.define("side-menu", SideMenu);