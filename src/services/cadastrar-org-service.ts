import { Org } from "../../generated/prisma/index.js";
import { OrgRepository } from "../repositories/contracts/org-repository.js";
import bcrypt from "bcrypt";

export interface CadastrarOrgRequest {
    name: string
    email: string
    password: string
    address:string
    city:string
    whatsapp:string
}

export interface CadastrarOrgResponse {
    org:Org
}

class CadastrarOrgService{
    constructor(private orgRepository: OrgRepository){}

    async execute(data:CadastrarOrgRequest):Promise<CadastrarOrgResponse>{
        const orgExists = await this.orgRepository.findByEmail(data.email)

        if(orgExists){
            throw new Error("Essa org já existe")
        }

        const hashedPassword = await this.hash_password(data.password)
        const dataToSave = {...data,password: hashedPassword}
        
        const org = await this.orgRepository.create(dataToSave)
        return { org }
    }

    async hash_password(password:string){
        const hashedPassword = await bcrypt.hash(password, 8)
        return hashedPassword
    }
}

export { CadastrarOrgService }