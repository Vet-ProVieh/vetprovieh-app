/**
 * Select Element for an external
 */
export class VetproviehSelect extends HTMLSelectElement {
  static get observedAttributes() {
    return ['src'];
  }

  attributeChangedCallback(name, old, value) {
    if (old !== value) {
      this[name] = value;
    }
  }

  constructor() {
    super();
    /**
         * @type {!Object}
         * @private
         */
    this._properties = {
      src: null,
    };
  }

  /**
     * @property {string|null} lib
     */
  get src() {
    return this._properties.src;
  }


  set src(val) {
    if (val !== this.src) {
      this._properties.src = val;
      // this._fetchDataFromServer();
    }
  }

  connectedCallback() {
    this._updateRendering();
  }

  /**
     * HTML-Output schreiben
     */
  _updateRendering() {
    console.log(this);
    console.log('Hello');
  }
}


// Komponente registrieren
customElements.define('vetprovieh-select', VetproviehSelect, {
  extends: 'select',
});
