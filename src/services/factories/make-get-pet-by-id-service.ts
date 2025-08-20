import { PrismaPetRepository } from "../../repositories/prisma/prisma-pet-repository.js";
import { GetPetById } from "../get-pet-by-id-service.js";

function makeGetPetByIdService(){
    const petRepository = new PrismaPetRepository()
    const getPetByIdService = new GetPetById(petRepository)

    return getPetByIdService
}

export { makeGetPetByIdService }