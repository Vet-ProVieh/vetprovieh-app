import { WebComponent } from "@tomuench/vetprovieh-shared/lib";
import { BasicIndexPage } from "../../../shared";
import { User } from "../../models";
import { UserRepository } from "../../repository";


@WebComponent({
    template: "",
    tag:"vetprovieh-users"
})
export class UsersIndexPage extends BasicIndexPage<User> {
    constructor() {
        console.log("UsersIndexPage");
        super(new UserRepository());
    }
}