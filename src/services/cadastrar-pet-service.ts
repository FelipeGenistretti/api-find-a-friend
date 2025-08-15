import { Pet } from "../../generated/prisma/index.js";
import { OrgRepository } from "../repositories/contracts/org-repository.js";
import { PetRepository } from "../repositories/contracts/pet-repository.js";

export interface CadastrarPetRequest {
  name: string
  age: "FILHOTE" | "ADULTO" | "IDOSO"     
  energyLevel: number                       
  independence: "BAIXA" | "MEDIA" | "ALTA"
  environment: "PEQUENO" | "MEDIO" | "AMPLO"
  about?: string                           
  orgId: string                              
}

export interface CadastrarPetResponse {
    pet:Pet;
}

class CadastrarPetService{
    constructor(
        private orgRepository : OrgRepository,
        private petRepository : PetRepository
    ){}


    async execute(data:CadastrarPetRequest):Promise<CadastrarPetResponse>{
        const org = await this.orgRepository.findById(data.orgId)

        if(!org){
            throw new Error("Organização não encontrada")
        }

        const pet = await this.petRepository.create(data)

        return { pet };
       
    }
}

export { CadastrarPetService }