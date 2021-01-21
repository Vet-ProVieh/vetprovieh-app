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
/*
        return fetch(`${this.endpoint}/current`)
        .then((response) => {
                return response.json()
            }
        });*/

        return new Promise((resolve, reject) => {
            let user = new User();
            user.firstName = "Stephan";
            user.lastName = "Göken";
            user.email = "test@test.de";
            user.tenant = new Tenant();
            user.tenant.name = "Gemeinschaftspraxis Göken & Braune";
            resolve(user);
        })
    }

    /**
     * aktuellen Benutzer abmelden
     */
    public logout(): void {
        this.keycloakHelper.logout();
    }
}