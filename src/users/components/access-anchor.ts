import {ViewHelper} from '@vetprovieh/vetprovieh-shared';
import {UserRepository} from '../repository';

/**
 * Access for Specific Anchor
 */
export class AccessAnchor extends HTMLAnchorElement {
    private repository: UserRepository = new UserRepository();

    private _roles: string[] = [];

    /**
     * Getter Role-Keys
     * @return {string}
     */
    public get roles(): string {
      return this._roles.join(', ');
    }

    /**
     * Setter Role-Keys
     * expected value RoleA, RoleB, RoleC
     * @param {string} v
     */
    public set roles(v: string) {
      if (v !== null && v !== undefined) {
        const input = v.split(',')
            .map((i) => i.trim());
        this._roles = input;
        this.setVisibility();
      }
    }

    /**
     * Set Visiblity dependent on role
     */
    private setVisibility() {
      if (this.roles && this.roles.length > 0) {
        const isInOneRole = this._roles
            .map((key) => this.repository.isInRole(key))
            .reduce((a, b) => a && b, true);
        if (!isInOneRole) {
          ViewHelper.toggleVisibility(this, false);
        }
      }
    }

    /**
      * Callback Implementation
      * @param {string} name
      * @param {any} old
      * @param {any} value
      */
    attributeChangedCallback(name: string, old: any, value: any) {
      if (old !== value) {
        (this as any)[name] = value;
      }
    }

    /**
     * Observed-Attributes for Web-Components
     */
    public static get observedAttributes() {
      return ['roles'];
    }
}


customElements.define('link-access', AccessAnchor, {extends: 'a'});
