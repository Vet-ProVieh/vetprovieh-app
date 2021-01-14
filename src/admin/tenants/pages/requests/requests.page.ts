import { WebComponent } from "@tomuench/vetprovieh-shared/lib";
import { BasicIndexPage } from "../../../../shared";
import { TenantRequest } from "../../models";
import { TenantRequestRepository } from "../../repository";


@WebComponent({
    template: "",
    tag:"vetprovieh-tenant-requests"
})
export class TenantRequestsIndexPage extends BasicIndexPage<TenantRequest> {
    constructor() {
        super(new TenantRequestRepository());
    }
}