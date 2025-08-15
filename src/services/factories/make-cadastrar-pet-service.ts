import { PrismaOrgRepository } from "../../repositories/prisma/prisma-org-repository.js";
import { PrismaPetRepository } from "../../repositories/prisma/prisma-pet-repository.js";
import { CadastrarPetService } from "../cadastrar-pet-service.js";

function makeCadastrarPetService(){
    const orgRepository = new PrismaOrgRepository()
    const petRepository = new PrismaPetRepository()
    const cadastrarPetService = new CadastrarPetService(orgRepository, petRepository)

    return cadastrarPetService
}

export { makeCadastrarPetService }