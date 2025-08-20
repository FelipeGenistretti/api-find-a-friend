import { OrgRepository } from "../repositories/contracts/org-repository.js";
import bcrypt from "bcrypt"

export interface LoginOrgRequest {
    email:string
    password:string
}

class OrgLoginService{
    constructor(private orgRepository: OrgRepository){}

    async execute(email:string, password:string){
        const org = await this.orgRepository.findByEmail(email)
        const isPasswordRight = await this.compare_password(data.password,)
        if(!org && !isPasswordRight){
            throw new Error("A Org ainda não existe")
        }

    }

    async compare_password(password:string, org_passowrd:string){
        const isPasswordRight = bcrypt.compare(password, org_passowrd)
        if(!isPasswordRight){
            throw new Error("A senha está errada")
        }

        return isPasswordRight
    }
}