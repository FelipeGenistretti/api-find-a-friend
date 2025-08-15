import { Pet } from "../../../generated/prisma/index.js";
import { prisma } from "../../http/lib/prisma.js";
import { CadastrarPetRequest, PetRepository } from "../contracts/pet-repository.js";


class PrismaPetRepository implements PetRepository{
    async create(data: CadastrarPetRequest): Promise<Pet> {
        const pet = await prisma.pets.create({
            data
        })
        return pet
    }
    
     
}

export { PrismaPetRepository }