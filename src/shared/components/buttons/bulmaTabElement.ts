import {VetproviehElement, WebComponent} from '@vetprovieh/vetprovieh-shared';
import {BulmaTabElement} from '../../models/bulmaTabElement';

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
