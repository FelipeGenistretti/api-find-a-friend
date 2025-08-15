import { Org, Pet } from "../../../generated/prisma/index.js"


export interface CadastrarPetRequest {
  name: string
  age: "FILHOTE" | "ADULTO" | "IDOSO"     
  energyLevel: number                       
  independence: "BAIXA" | "MEDIA" | "ALTA"
  environment: "PEQUENO" | "MEDIO" | "AMPLO"
  about?: string                           
  orgId: string                              
}

export interface OrgRepository {
    findById(id:string):Promise<Org | null>
}