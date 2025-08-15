import { PrismaOrgRepository } from "../../repositories/prisma/prisma-org-repository.js";
import { CadastrarPetService } from "../cadastrar-pet-service.js";

function makeCadastrarPetService(){
    const orgRepository = new PrismaOrgRepository()
    const cadastrarPetService = new CadastrarPetService(orgRepository)

    return cadastrarPetService
}

export { makeCadastrarPetService }