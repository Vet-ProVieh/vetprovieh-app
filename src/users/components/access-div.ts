import {UserRepository} from '../repository';
import {ViewHelper} from '@tomuench/vetprovieh-shared/lib';

/**
 * Access for Specific Anchor
 */
export class AccessDiv extends HTMLDivElement {
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
        const input = v.split(',');
        input.forEach((i) => i = i.trim());
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
     * observed Attributes for Web-Components
     */
    public static get observedAttributes() {
      return ['roles'];
    }
}


customElements.define('div-access', AccessDiv, {extends: 'div'});
