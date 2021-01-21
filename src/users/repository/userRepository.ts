import { User } from "../models";
import { BaseRepository } from "@tomuench/vetprovieh-shared/lib";
import { Tenant } from "../../admin/tenants/models";

export class UserRepository extends BaseRepository<User> {

    private keycloakHelper = new KeycloakHelper();
    constructor() {
        super(`/service/usermanagements`);

        this.keycloakHelper.init().then(() => {
        });
    }

    /**
     * Get current Subdomain
     * @return {string}
     */
    public static get subdomain() {
        try {
            return window.location.hostname.split(".")[0];
        } catch (ex) {
            return "unknown";
        }
    }

    /**
     * Load User from Service
     * @return {Promise<User>}
     */
    public loadProfile(): Promise<User> {
        return fetch(`${this.endpoint}/current`)
        .then((response) => {
            if (response.ok) {
                return response.json()
            } else {
                throw Error(response.statusText);
            }
        });
    }

    /**
     * aktuellen Benutzer abmelden
     */
    public logout(): void {
        this.keycloakHelper.logout();
    }
}