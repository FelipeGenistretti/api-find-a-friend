import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";
import { makeCadastrarPetService } from "../../services/factories/make-cadastrar-pet-service.js";


class OrgController{
    async cadastrar_pet(request:FastifyRequest, response: FastifyReply){
        const bodySchema = z.object({
            name:z.string(),
            age:z.enum(["FILHOTE", "ADULTO", "IDOSO"]),
            energyLevel : z.int().min(1).max(5),
            independence : z.enum(["BAIXA", "MEDIA", "ALTA"]),
            environment: z.enum(["PEQUENO", "MEDIO", "AMPLO"]),
            orgId: z.string().uuid()
        })

        const data = await bodySchema.parseAsync(request.body)

        try {
            const cadastrarPetService = makeCadastrarPetService()

            const { pet } = await cadastrarPetService.execute(data)

            return response.status(201).send({ pet })

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