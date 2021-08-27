import {VetproviehNavParams} from '@tomuench/vetprovieh-shared';
import {VetproviehElement, WebComponent} from '@tomuench/vetprovieh-shared/lib';

/**
 * Extension for a Link Tag (a-element)
 */
@WebComponent({
  tag: 'store-local-link',
  template: VetproviehElement.template + `
    <a href="\${this.href}"> \${this.content}</a>
    `,
})
export class AStoreLocal extends VetproviehElement {
    private _params: any;

    public get params(): any {
      return this._params;
    }

    public set params(v: any) {
      if (this._params != v) {
        this._params = v;
      }
    }


    private _href ='';
    public get href() : string {
      return this._href;
    }

    public set href(v : string) {
      this._href = v;
    }

    static get observedAttributes() {
      return ['href'];
    }


    private _content = '';

    public get content() : string {
      return this._content;
    }

    public set content(v : string) {
      this._content = v;
    }

    constructor() {
      super(true, false);
      this.content = this.innerHTML;
      this.render();
    }

    connectedCallback() {
      this._attachClickListener();
    }

    _attachClickListener() {
      const _self = this;

      this.addEventListener('click', (e) => {
        const location = window.location.href.substr(0, window.location.href.lastIndexOf('/')+1);
        VetproviehNavParams.set(location + this.href, this.params);
        window.open(this.href, '_self');
      });
    }
}
