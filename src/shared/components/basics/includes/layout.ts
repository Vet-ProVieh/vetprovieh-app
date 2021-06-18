import { VetproviehElement, WebComponent } from '@tomuench/vetprovieh-shared/lib';

/**
 * Layout for Vet:ProVieh
 */
@WebComponent({
  tag: "vetprovieh-layout",
  template: `<div id="pageloader" 
      class="pageloader is-active has-background-vetprovieh-light-blue">
            <span class="title">Ihre Daten werden geladen...</span>
          </div>
          <nav class="navbar is-fixed-top has-shadow 
                  has-background-vetprovieh-light-blue" 
            role="navigation" aria-label="main navigation">
          <div class="navbar-brand">
              <a id="left-menu-open" class="navbar-item has-text-white" >
                  <i class="fas fa-bars"></i>
              </a>
              <h1 id="title" class="has-text-white"> \${this.title} </h1>
          </div>
          <!-- <button id="right-menu-open">open right</button> -->
          </nav>
          <vetprovieh-sidemenu id="left-menu" width="300px">
          <aside class="menu">
              <profile-widget></profile-widget>
              <ul class="menu-list">
                  <li><a href="/index.html">
                  <i class="fas fa-compass"></i> Dashboard</a></li>
              </ul>
              <p class="menu-label">
                  Behandlung
              </p>
              <ul class="menu-list">
                  <li><a href="/careplans/operational/1_selectBarn.html">
                  <i class="fas fa-hand-holding-medical"></i> Neue Behandlung</a></li>
                  <li><a href="/careplans/operational">
                  <i class="fas fa-hand-holding-medical"></i> Behandlungen</a></li>
              </ul>
              <p class="menu-label">
                Maßnahmenplanung
              </p>
              <ul class="menu-list">
                  <li><a href="/measures">
                  <i class="fas fa-warehouse"></i> Maßnahmenpläne</a></li>
                  <li><a href="/measures">
                  <i class="fas fa-paw"></i> Maßnahmen</a></li>
              </ul>
              <!--
              <p class="menu-label">
                  Persönliche Einstellungen
              </p>
              <ul class="menu-list">
                  <li><a href="#">Benachrichtigungen</a></li>
                  <li><a href="#">Termine</a></li>
              </ul>
              -->
              <p class="menu-label">
                Meine Stammdaten
              </p>
              <ul class="menu-list">
                  <li><a href="/farmers">
                  <i class="fas fa-warehouse"></i> Landwirte</a></li>
                  <li><a href="/barns">
                  <i class="fas fa-paw"></i> Ställe</a></li>
                  <li><a href="/drugs">
                  <i class="fas fa-tablets"></i> Medikamente</a></li>
              </ul>
              <div is="div-access" roles="admin">
                <p class="menu-label" style="margin-top: 1em;">
                  Meine Praxis
                </p>
                <ul class="menu-list">
                    <li><a href="/settings/surgery">Basisdaten</a></li>
                    <li><a href="/users">Mitarbeiter</a></li>
                    <li><a href="/settings/careplans">Behandlungspläne</a></li>
                </ul>
              </div>

              <div is="div-access" roles="global-admin">
                <p class="menu-label" style="margin-top: 1em;">
                  Administration
                </p>
                <ul class="menu-list">
                  <li><a href="/admin/tenants/requests.html">Tenant-Requests</a></li>
                  <li><a href="/admin/tenants">Tenants</a></li>
                </ul>
              </div>
              
          </aside>
          </vetprovieh-sidemenu>
          <!--  <vetprovieh-sidemenu id="right-menu" 
                  orientation="right" width="300px">
          <h2> Right </h2>
          <ul>
              <li><a href="#">Item 1</a></li>
              <li><a href="#">Item 2</a></li>
              <li><a href="#">Item 3</a></li>
          </ul>
          </vetprovieh-sidemenu> -->
          <section class="section full-height" style="padding-top: 1rem">
          <div id="mainContainer" class="container">
            \${this._outsideInnerHtml}
          </div>
          </section>

          <vetprovieh-footer></vetprovieh-footer>
            `
})
export class VetproviehLayout extends VetproviehElement {
  /**
       * Observed Attributes
       */
  static get observedAttributes() {
    return ['title'];
  }

  private _title = 'No Title Set';
  private _outsideInnerHtml = '';

  /**
   * Konstruktor
   */
  constructor() {
    super(false, false);
    this._outsideInnerHtml = this.innerHTML;

    const self = this;
    document.addEventListener('DOMContentLoaded', function () {
      self._deactivatePageLoader();
    }, false);
  }

  /**
   * PUBLIC
   * Getter for title of current layout
   * @return {string}
   */
  get title() {
    return this._title;
  }

  /**
   * PUBLIC
   * Setter for title of current layout
   * @param {string} val
   */
  set title(val) {
    if (val !== this.title) {
      this._title = val;
    }
  }

  /**
   * Callback after Render
   */
  connectedCallback() {
    this._addCssClassToBody();
    this.render();
    this._addListenerToButton();
  }

  public render() {
    super.render();
    console.log("RENDERING");
  }
  protected get skipRenderOnCallback() : boolean {
    return true;
  }
  /**
   * CSS-Klasse an das Body-Element hängen, so dass Header fixed ist.
   */
  _addCssClassToBody() {
    document.getElementsByTagName('body')[0]
      .classList.add('has-navbar-fixed-top');

    document.body.style.visibility = "visible";
  }

  /**
   * Listener for Button (Left/Right)
   */
  _addListenerToButton() {
    ['left', 'right'].forEach((menuOrientation) => {
      const button = document
        .getElementById(menuOrientation + '-menu-open') as HTMLElement;
      const sideMenu = document
        .getElementById(menuOrientation + '-menu') as HTMLElement;
      if (button) {
        button.addEventListener('click', () => {
          sideMenu.dispatchEvent(new Event('toggle'));
        });
      }
    });
  }

  /**
   * Hide pageloader
   * @private
   */
  _deactivatePageLoader() {
    const element = document.getElementById('pageloader') as HTMLElement;
    const mainContainer = document.getElementById('mainContainer') as HTMLElement;
    setTimeout(
      (_) => {
        element.classList.remove('is-active')
      },
      100);
  }

}
