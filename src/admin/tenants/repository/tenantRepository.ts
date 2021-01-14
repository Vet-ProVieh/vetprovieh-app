import { BaseRepository } from "@tomuench/vetprovieh-shared/lib";
import { Tenant } from "../models";

export class TenantRepository extends BaseRepository<Tenant>{

    constructor(){
        super("/service/tenantmanagements");
    }
}