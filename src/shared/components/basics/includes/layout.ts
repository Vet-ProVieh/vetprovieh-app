import {VetproviehElement, WebComponent} from '@vetprovieh/vetprovieh-shared';

/**
 * Layout for Vet:ProVieh
 */
// eslint-disable-next-line new-cap
@WebComponent({
  tag: 'vetprovieh-layout',
  template: `
          <nav class="navbar is-fixed-top has-shadow
                  has-background-vetprovieh-light-blue"
            role="navigation" aria-label="main navigation">
          <div class="navbar-brand">
              <a id="left-menu-open" class="navbar-item has-text-white" >
                  <i class="fas fa-bars" aria-hidden="true"></i>
              </a>
              <h1 id="title" class="has-text-white"> \${this.title} </h1>
          </div>
          <!-- <button id="right-menu-open">open right</button> -->
          </nav>
          <vetprovieh-sidemenu id="left-menu" width="300px">
          <template>
          <aside class="menu">
              <profile-widget></profile-widget>
              <ul class="menu-list">
                  <li><a href="/index.html">
                    <i class="fas fa-compass" aria-hidden="true"></i>
                    Dashboard
                  </a></li>
              </ul>
              <p class="menu-label">
                  Behandlung
              </p>
              <ul class="menu-list">
                  <li><a href="/careplans/operational/1_selectBarn.html">
                  <i class="fas fa-hand-holding-medical" aria-hidden="true">
                  </i> Neue Behandlung</a></li>
                  <li><a href="/careplans/operational">
                  <i class="fas fa-hand-holding-medical" aria-hidden="true">
                  </i> Behandlungen</a></li>
              </ul>
              <p class="menu-label">
                Maßnahmenplanung
              </p>
              <ul class="menu-list">
                  <li><a href="/measures">
                  <i class="fas fa-warehouse" aria-hidden="true">
                  </i> Maßnahmenpläne</a></li>
              </ul>
              <p class="menu-label">
                Antibiotikamonitoring
              </p>
              <ul class="menu-list">
                  <li><a href="/drugtreatments">
                  <i class="fas fa-syringe" aria-hidden="true">
                  </i> Antibiotika-Behandlung</a></li>
                  <!--<li><a href="/drugreports">
                  <i class="fas fa-notes-medical" aria-hidden="true">
                  </i> Antibiotika-Berichte</a></li>-->
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
                  <i class="fas fa-warehouse" aria-hidden="true">
                  </i> Landwirte</a></li>
                  <li><a href="/barns">
                  <i class="fas fa-paw" aria-hidden="true">
                  </i> Ställe</a></li>
                  <li><a href="/drugs">
                  <i class="fas fa-tablets" aria-hidden="true">
                  </i> Medikamente</a></li>
              </ul>
              <div is="div-access" roles="admin">
                <p class="menu-label" style="margin-top: 1em;">
                  Meine Praxis
                </p>
                <ul class="menu-list">
                    <li><a href="/admin/tenants/credentials">
                      Zugangsdaten (Portale)</a></li>
                    <li><a href="/users">Mitarbeiter</a></li>
                    <li><a href="/settings/careplans">Behandlungspläne</a></li>
                </ul>
              </div>

              <div is="div-access" roles="global-admin">
                <p class="menu-label" style="margin-top: 1em;">
                  Administration
                </p>
                <ul class="menu-list">
                  <li><a href="/admin/tenants/requests.html">
                    Tenant-Requests</a></li>
                  <li><a href="/admin/tenants">Tenants</a></li>
                </ul>
              </div>

          </aside>
          </template>
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
          <div id="mainContainer" class="container ">
            \${this._outsideInnerHtml}
            <back-button></back-button>
          </div>
          </section>
            `,
})
/**
 * Vetprovieh-Layout
 */
export class VetproviehLayout extends VetproviehElement {
  /**
       * Observed Attributes
       * @return {string[]}
       */
  static get observedAttributes() : string[] {
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

  /**
   * skip render on callback?
   * @return {boolean}
   */
  protected get skipRenderOnCallback() : boolean {
    return true;
  }

  /**
   * CSS-Klasse an das Body-Element hängen, so dass Header fixed ist.
   */
  _addCssClassToBody() {
    document.getElementsByTagName('body')[0]
        .classList.add('has-navbar-fixed-top');

    document.body.style.visibility = 'visible';
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
}
