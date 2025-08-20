import { FastifyReply, FastifyRequest } from "fastify";
import z, { email } from "zod";
import { makeOrgLoginService } from "../../services/factories/make-org-login-service.js";




class AuthController{
    async org_login(request:FastifyRequest, response:FastifyReply){
        const bodySchema = z.object({
            email: z.string().email(),
            password: z.string().min(6)
        })

        const { email, password } = await bodySchema.parseAsync(request.body)

        try {
            const orgLoginService = makeOrgLoginService()
            const result = await orgLoginService.execute(email, password)
            return response.status(200).send(result)
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

export { AuthController }