import {User} from '../models';
import {BaseRepository} from '@tomuench/vetprovieh-shared/lib';

/**
 * Repository to Access Users
 */
export class UserRepository extends BaseRepository<User> {
    private keycloakHelper = KeycloakHelper.instance();
    /**
     * Default-Contructor
     */
    constructor() {
      super(`/service/usermanagements`);

    }

    /**
     * Get current Subdomain
     * @return {string}
     */
    public static get subdomain() {
      try {
        return window.location.hostname.split('.')[0];
      } catch (ex) {
        return 'unknown';
      }
    }

    /**
     * Check if User is in a specific Role
     * Uses Keycloak JWT-Token to answer
     * @param {string} name
     * @return {boolean}
     */
    public isInRole(name: string) : boolean {
      return this.roles.indexOf(name) >= 0;
    }

    /**
     * Load User from Service
     * @return {Promise<User>}
     */
    public loadProfile(): Promise<User> {
      return new Promise((resolve, reject) => {
        fetch(`${this.endpoint}/current`)
            .then((response) => {
              response.json().then(resolve);
            }).catch((error) => reject(error));
      });
    }

    /**
     * aktuellen Benutzer abmelden
     */
    public logout(): void {
      this.keycloakHelper.logout();
    }

    /**
     * Gettings Roles from JWT
     * @return {string[]}
     */
    private get roles() : string[] {
      let token = this.jwtToken;
      if (token) {
        token = JSON.parse(token);
        return token.realm_access.roles;
      } else {
        return [];
      }
    }

    /**
     * Getting Stored JWT Token
     * @return {any}
     */
    private get jwtToken(): any {
      return localStorage.getItem('kc_token_parsed');
    }
}
