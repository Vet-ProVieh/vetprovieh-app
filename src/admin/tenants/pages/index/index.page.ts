import { WebComponent } from "@tomuench/vetprovieh-shared/lib";
import { BasicIndexPage } from "../../../../shared";
import { Tenant } from "../../models";
import { TenantRepository } from "../../repository";


@WebComponent({
    template: "",
    tag:"vetprovieh-tenants"
})
export class TenantsIndexPage extends BasicIndexPage<Tenant> {
    constructor() {
        super(new TenantRepository());
    }
}