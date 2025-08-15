import { Org } from "../../../generated/prisma/index.js";
import { prisma } from "../../http/lib/prisma.js";
import { OrgRepository } from "../contracts/org-repository.js";


class PrismaOrgRepository implements OrgRepository{
    async findById(orgId: string): Promise<Org | null> {
        const org = await prisma.orgs.findUnique({
            where:{id:orgId}
        })
        return org
    }
     
}

export { PrismaOrgRepository }