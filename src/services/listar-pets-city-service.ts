import { Pet } from "../../generated/prisma/index.js";
import { PetRepository } from "../repositories/contracts/pet-repository.js";


export interface ListarPetsCityResponse{
    pets:Pet[];
    page:number
    perPage:number
    total:number
    totalPages:number
}

class ListarPetsCityService{
    constructor(
        private petRepository:PetRepository
    ){}

    async execute(city:string, page=1, perPage=10):Promise<ListarPetsCityResponse>{
        const total = await this.petRepository.countPetsInCity(city)
        const pets = await this.petRepository.findPetsInCity(city, page, perPage)

        if(pets.length === 0){
            throw new Error("Não tem pets nessa cidade")
        }

        return { 
            pets,
            page,
            perPage,
            total,
            totalPages:Math.ceil(total/perPage)
         }
    }
}

export { ListarPetsCityService }