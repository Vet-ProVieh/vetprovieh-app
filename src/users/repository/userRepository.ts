import { User, Tenant } from "../models";
import { BaseRepository } from "@tomuench/vetprovieh-shared/lib";

export class UserRepository extends BaseRepository<User> {

    constructor(){
        super("/service/usermanagement/");
    }
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