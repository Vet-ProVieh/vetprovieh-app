import {VetproviehElement, WebComponent} from '@vetprovieh/vetprovieh-shared';

// eslint-disable-next-line new-cap
@WebComponent({
  template: `
        <li class="is-active">
            <a>
                <span class="icon is-small">
                  <i class="fas \${this.icon}" aria-hidden="true">
                  </i>
                </span>
                <span>\${this.displayName}</span>
            </a>
        </li>
    `,
  tag: 'bulma-tab-element',
})
/**
 * Bulmatab-Element-Component
 */
export class BulmaTabElementComponent extends VetproviehElement {
    private _active = false;
    public icon: string | undefined;
    public name: string | undefined;
    public displayName: string | undefined;

    /**
     * Default-Constructor
     * @param {BulmaTabElement} element
     */
    constructor(element: BulmaTabElement) {
      super();
      if (element) {
        this.icon = element.icon;
        this.name = element.name;
        this.displayName = element.displayName;
      }
    }

    /**
     * set active
     * @param {boolean} v
     */
    public set active(v: boolean) {
      if (this._active !== v) {
        this._active = v;
        if (v) this.listElement.classList.add('is-active');
        else this.listElement.classList.remove('is-active');
      }
    }

    /**
     * get active
     * {boolean}
     */
    public get active(): boolean {
      return this._active;
    }

    /**
     * ConnectedCallback
     */
    connectedCallback() {
      this.registerEventListeners();
    }

    /**
     * Inner List Element
     * @return {HTMLLIElement}
     */
    private get listElement(): HTMLLIElement {
      return this.shadowRoot?.querySelector('li') as HTMLLIElement;
    }

    /**
     * Register Event listeners
     */
    private registerEventListeners() {
      this.listElement.addEventListener('click', () => {
        this.dispatchEvent(new CustomEvent('selected',
            {
              detail: {
                name: this.name,
              },
            }));
      });
    }
}


/**
 * Tabulator Element
 */
export class BulmaTabElement {
    public icon: string | undefined;
    public name: string | undefined;
    public displayName: string | undefined;
}

// eslint-disable-next-line new-cap
@WebComponent({
  template: `
        <div class="tabs is-toggle is-fullwidth is-large">
            <ul id="tabElements">
            </ul>
        </div>
    `,
  tag: 'bulma-tab',
})
/**
 * Bulma-Tab-Component
 */
export class BumlaTabComponent extends VetproviehElement {
    private _tabElements: BulmaTabElement[] = [];

    private _current = '';

    /**
     * Set selected Tab
     * @param {string} v
     */
    public set current(v: string) {
      if (this._current !== v) {
        this._current = v;
      }
    }

    /**
     * Get selected Tab
     * @return {string}
     */
    public get current(): string {
      return this._current;
    }

    /**
     * Setting TabElements
     * @param {BulmaTabElement[]} v
     */
    public set tabElements(v: BulmaTabElement[]) {
      if (this._tabElements !== v) {
        this._tabElements = v;
        this.renderTabElements();
      }
    }

    /**
     * Adding new Element to Content
     * @param {BulmaTabElement} tab
     */
    public appendTab(tab: BulmaTabElement) {
      const newElement = new BulmaTabElementComponent(tab);
      this.tabElementsContainer.append(newElement);
    }

    /**
     * Rendering Tab Element
     */
    private renderTabElements() {
      this._tabElements
          .forEach((element: BulmaTabElement) => this.appendTab(element));
    }

    /**
     * Tab-Elemente laden
     * @return {HTMLUListElement}
     */
    private get tabElementsContainer(): HTMLUListElement {
      return this.getByIdFromShadowRoot('tabElements') as HTMLUListElement;
    }

    /**
     * Get Tab-Elements-Components
     * @return {NodeListOf<BulmaTabElementComponent> | undefined}
     */
    private get tabElementComponents()
    : NodeListOf<BulmaTabElementComponent> | undefined {
      return this.shadowRoot?.querySelectorAll('bulma-tab-element');
    }

    /**
     * Tab-Buttons registrieren.
     */
    private registerTabEvents() {
        this.tabElementComponents?.forEach((a: BulmaTabElementComponent) => {
          if (a) {
            a.addEventListener('selected', () => {
              this.activateTabAnchor(a);
              this.deactiveTabAnchors(a);
            });
          }
        });
    }

    /**
     * Mark Anchor as activated and remove hidden vor Tab
     * @param {BulmaTabElementComponent} a
     */
    private activateTabAnchor(a: BulmaTabElementComponent) {
      a.active = true;
    }

    /**
     * Mark Tab-Anchor as not active and hide other Elements
     * @param {BulmaTabElementComponent} a
     */
    private deactiveTabAnchors(a: BulmaTabElementComponent) {
        this.tabElementComponents?.forEach((otherA) => {
          if (otherA !== a) {
            otherA.active = false;
          }
        }, false);
    }
}
