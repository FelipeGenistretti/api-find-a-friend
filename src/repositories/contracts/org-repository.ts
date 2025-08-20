import { Org, Pet } from "../../../generated/prisma/index.js"
import { CadastrarOrgRequest } from "../../services/cadastrar-org-service.js"


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
    create(data:CadastrarOrgRequest):Promise<Org>
    findByEmail(email:string):Promise<Org | null>
}