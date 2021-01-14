import { BaseRepository } from "@tomuench/vetprovieh-shared/lib";
import { TenantRequest } from "../models";

export class TenantRequestRepository extends BaseRepository<TenantRequest>{

    constructor(){
        super("/service/tenantsmanagements/requests");
    }
}