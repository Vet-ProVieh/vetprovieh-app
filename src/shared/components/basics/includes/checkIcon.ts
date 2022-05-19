import {VetproviehElement, WebComponent} from '@tomuench/vetprovieh-shared/lib';

// eslint-disable-next-line new-cap
@WebComponent({
  template: VetproviehElement.template +
  `<i class="fas \${this.icon}" aria-hidden="true"></i>`,
  tag: 'bulma-check-icon',
})
/**
 * Check Icon Element
 */
export class CheckIcon extends VetproviehElement {
    private _active = false;

    /**
     * Default-Coonstructor
     */
    constructor() {
      super(true, true);
    }

    /**
     * Getter active
     * @return {string}
     */
    public get active(): string {
      return this._active + '';
    }

    /**
     * Setter active
     * @param {string} v
     */
    public set active(v: string) {
      const vAsBool = v === 'true';
      if (this._active !== vAsBool) {
        this._active = vAsBool;
      }
    }

    /**
     * Getter icon
     * @return {string}
     */
    public get icon(): string {
      if (this._active) {
        return 'fa-check-square';
      } else {
        return 'fa-square';
      }
    }

    /**
     * Observed Attributes
     * @return {string[]}
     */
    static get observedAttributes() : string[] {
      return ['active'];
    }
}
