import { PrismaPetRepository } from "../../repositories/prisma/prisma-pet-repository.js";
import { ListarPetsCaracteristicaService } from "../listar-pet-caracteristca-service.js";

function makeListarPetCaracteristicaService(){
    const petRepository = new PrismaPetRepository()
    const listarPetCaracteristicaService = new ListarPetsCaracteristicaService(petRepository)

    return listarPetCaracteristicaService
}

export { makeListarPetCaracteristicaService }