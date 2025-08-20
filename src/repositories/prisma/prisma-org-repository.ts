import { Org, Pet } from "../../../generated/prisma/index.js";
import { prisma } from "../../http/lib/prisma.js";
import { CadastrarOrgRequest } from "../../services/cadastrar-org-service.js";
import { OrgRepository } from "../contracts/org-repository.js";


class PrismaOrgRepository implements OrgRepository{
    async findByEmail(email: string): Promise<Org | null> {
        const org = await prisma.orgs.findUnique({
            where:{
                email
            }
        })
        return org
    }

    async create(data: CadastrarOrgRequest): Promise<Org> {
        const org = await prisma.orgs.create({
            data
        })

        return org
    }

    async findById(orgId: string): Promise<Org | null> {
        const org = await prisma.orgs.findUnique({
            where:{id:orgId}
        })
        return org
    }
     
}

export { PrismaOrgRepository }