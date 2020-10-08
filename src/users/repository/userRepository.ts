import { User, Tenant } from "../models";

export class UserRepository {

    /**
     * Load User from Service
     * @return {Promise<User>}
     */
    public loadProfile(): Promise<User> {
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
}