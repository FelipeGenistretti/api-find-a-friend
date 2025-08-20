import { OrgRepository } from "../repositories/contracts/org-repository.js";
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
import { env } from "../env/index.js";

export interface LoginOrgRequest {
    email:string
    password:string
}

class OrgLoginService{
    constructor(private orgRepository: OrgRepository){}

    async execute(email:string, password:string){
        const org = await this.orgRepository.findByEmail(email)
        if(!org){
            throw new Error("A Org ainda não existe")
        }

        const isPasswordRight = await this.compare_password(password, org.password)

        if(!isPasswordRight){
            throw new Error("A senha está errada")
        }
         const token = jwt.sign(
            { sub: org.id },         // payload
            env.JWT_SECRET,          // chave secreta vinda do .env
            { expiresIn: "7d" }      // expiração (7 dias)
        );

         return {
            token,
            org:{
                id: org.id,
                name: org.name,
                email: org.email,
            },
        };

    }

    async compare_password(password:string, orgPassowrd:string):Promise<boolean>{
        return bcrypt.compare(password, orgPassowrd)
    }
}

export { OrgLoginService }