import { FastifyReply, FastifyRequest } from "fastify";
import z, { email } from "zod";



class AuthController{
    async org_login(request:FastifyRequest, response:FastifyReply){
        const bodySchema = z.object({
            email: z.string().email(),
            password: z.string().min(6)
        })

        const { email, password } = await bodySchema.parseAsync(request.body)

        try {
            
        } catch (error) {
            
        }
    }
}