import { Pet } from "../../generated/prisma/index.js";
import { PetRepository } from "../repositories/contracts/pet-repository.js";


export interface ListarPetsCityResponse{
    pets:Pet[];
}

class ListarPetsCity{
    constructor(
        private petRepository:PetRepository
    ){}

    async execute(city:string):Promise<ListarPetsCityResponse>{
        const pets = await this.petRepository.findPetsInCity(city)

        if(pets.length === 0){
            throw new Error("Não tem pets nessa cidade")
        }

        return { pets }
    }
}