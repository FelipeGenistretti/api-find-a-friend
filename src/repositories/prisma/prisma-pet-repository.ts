import { includes } from "zod";
import { Pet } from "../../../generated/prisma/index.js";
import { prisma } from "../../http/lib/prisma.js";
import { CadastrarPetRequest, PetRepository } from "../contracts/pet-repository.js";
import { skip } from "@prisma/client/runtime/library";


class PrismaPetRepository implements PetRepository{
    async countPetsInCity(city: string):Promise<number> {
        const total = await prisma.pets.count({
            where:{
                org:{city}
            }
        })
        return total;
    }

    async findPetsInCity(city: string, page=1, perPage=10): Promise<Pet[]> {
        const pets = await prisma.pets.findMany({
            where: {
                org : {
                    city,
                },
            },
            include : {
                org:true,
            },
            skip:(page - 1) * perPage,
            take: perPage
        });
        return pets
    }

    async create(data: CadastrarPetRequest): Promise<Pet> {
        const pet = await prisma.pets.create({
            data
        })
        return pet
    }
    
     
}

export { PrismaPetRepository }