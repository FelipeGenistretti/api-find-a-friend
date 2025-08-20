import { PrismaOrgRepository } from "../../repositories/prisma/prisma-org-repository.js";
import { PrismaPetRepository } from "../../repositories/prisma/prisma-pet-repository.js";
import { CadastrarPetService } from "../cadastrar-pet-service.js";
import { ListarPetsCityService } from "../listar-pets-city-service.js";

function makeListarPetCityService(){
    const petRepository = new PrismaPetRepository()
    const listarPetCityService = new ListarPetsCityService(petRepository)

    return listarPetCityService
}

export { makeListarPetCityService }