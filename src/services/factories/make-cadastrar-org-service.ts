import { PrismaOrgRepository } from "../../repositories/prisma/prisma-org-repository.js";
import { CadastrarOrgService } from "../cadastrar-org-service.js";

function makeCadastrarOrgService(){
    const orgRepository = new PrismaOrgRepository()
    const cadastrarOrgService = new CadastrarOrgService(orgRepository)

    return cadastrarOrgService
}

export { makeCadastrarOrgService }