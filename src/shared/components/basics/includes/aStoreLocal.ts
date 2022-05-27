import {VetproviehNavParams} from '@vetprovieh/vetprovieh-shared';
import {VetproviehElement, WebComponent} from '@vetprovieh/vetprovieh-shared';


// eslint-disable-next-line new-cap
@WebComponent({
  tag: 'store-local-link',
  template: VetproviehElement.template + `
    <a href="\${this.href}"> \${this.content}</a>
    `,
})
/**
 * Extension for a Link Tag (a-element)
 */
export class AStoreLocal extends VetproviehElement {
  private _params: any;
  private _href = '';
  private _content = '';

  /**
   * Default-Contructor
   */
  constructor() {
    super(true, false);
    this.content = this.innerHTML;
    this.render();
  }

  /**
   * Connected-Callback
   */
  connectedCallback() {
    this._attachClickListener();
  }

  /**
   * Getter params
   * @return {any}
   */
  public get params(): any {
    return this._params;
  }

  /**
   * Setter params
   * @param {any} v
   */
  public set params(v: any) {
    if (this._params != v) {
      this._params = v;
    }
  }


  /**
   * Getter href
   * @return {string}
   */
  public get href(): string {
    return this._href;
  }

  /**
   * Getter href
   * @param {string} v
   */
  public set href(v: string) {
    if (this._href !== v) {
      this._href = v;
    }
  }

  /**
   * return observed Attributes
   * @return {string[]}
   */
  static get observedAttributes(): string[] {
    return ['href'];
  }

  /**
   * Getter content
   * @return {string}
   */
  public get content(): string {
    return this._content;
  }

  /**
   * setter content
   * @param {string} v
   */
  public set content(v: string) {
    if (this._content !== v) {
      this._content = v;
    }
  }


  /**
   * Adding eventListeners
   */
  private _attachClickListener() {
    const clickMethod = () => {
      const location = window.location
          .href.substr(0, window.location.href.lastIndexOf('/') + 1);
      VetproviehNavParams.set(location + this.href, this.params);
      window.open(this.href, '_self');
    };
    clickMethod.bind(this);

    this.addEventListener('click', clickMethod);
  }
}
