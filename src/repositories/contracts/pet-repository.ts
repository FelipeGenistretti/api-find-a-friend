import { Pet } from "../../../generated/prisma/index.js";

export interface CadastrarPetRequest {
  name: string
  age: "FILHOTE" | "ADULTO" | "IDOSO"     
  energyLevel: number                       
  independence: "BAIXA" | "MEDIA" | "ALTA"
  environment: "PEQUENO" | "MEDIO" | "AMPLO"
  about?: string                           
  orgId: string  
}

export interface PetRepository {
    create(data:CadastrarPetRequest):Promise<Pet>
    findPetsInCity(city:string):Promise<Pet[]>
}