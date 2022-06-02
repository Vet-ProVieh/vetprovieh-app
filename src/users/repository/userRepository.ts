import {User} from '../models';
import {BaseRepository} from '@vetprovieh/vetprovieh-shared';
import {KeycloakHelper} from '../../shared/providers/KeycloakHelper';

/**
 * Repository to Access Users
 */
export class UserRepository extends BaseRepository<User> {
    private keycloakHelper = KeycloakHelper.instance();
    /**
     * Default-Contructor
     */
    constructor() {
      super(`/service/users`);
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
    public async loadProfile(): Promise<User> {
      const response= await fetch(`${this.endpoint}/current`);
      return await response.json();
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
