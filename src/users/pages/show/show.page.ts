import { WebComponent } from "@tomuench/vetprovieh-shared/lib";
import { BasicIndexPage, BasicShowPage } from "../../../shared";
import { User } from "../../models";
import { UserRepository } from "../../repository";


@WebComponent({
    template: "",
    tag:"vetprovieh-user"
})
export class UsersShowPage extends BasicShowPage{
    
    private repository : UserRepository = new UserRepository();

    connectedCallback() {
        this.detailElement.src = this.repository.endpoint;
    }
}