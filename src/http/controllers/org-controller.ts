import { FastifyReply, FastifyRequest } from "fastify";
import { email, z } from "zod";
import { makeCadastrarPetService } from "../../services/factories/make-cadastrar-pet-service.js";
import { makeCadastrarOrgService } from "../../services/factories/make-cadastrar-org-service.js";


class OrgController{
    async cadastrar_org(request:FastifyRequest, response:FastifyReply){
        const bodySchema = z.object({
            name:z.string(),
            email:z.string().email(),
            password:z.string().min(6),
            address:z.string(),
            city:z.string(),
            whatsapp:z.string()
        })

        const data = await bodySchema.parseAsync(request.body)

        try {
            const cadastrarOrgService = makeCadastrarOrgService()
            const org = await cadastrarOrgService.execute(data)
            return response.status(201).send(org)
        } catch (error) {
            if (error instanceof z.ZodError) {
                return response.status(400).send({
                        message: "Erro de validação",
                        errors: error.format()
                });
                }
                return response.status(500).send({
                     message: (error as Error).message || "Erro interno no servidor"
                });
        }
    }
}

export { OrgController }