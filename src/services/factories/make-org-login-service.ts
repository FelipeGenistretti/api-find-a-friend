import { PrismaOrgRepository } from "../../repositories/prisma/prisma-org-repository.js";
import { OrgLoginService } from "../org-login-service.js";

function makeOrgLoginService(){
    const orgRepository = new PrismaOrgRepository()
    const orgLoginService = new OrgLoginService(orgRepository)

    return orgLoginService
}

export { makeOrgLoginService }