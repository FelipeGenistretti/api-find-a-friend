import { FastifyReply, FastifyRequest } from "fastify";
import z from "zod";

class PetController{
    async list_pets_in_city(request:FastifyRequest, response:FastifyReply){
        const bodySchema = z.object({
            city: z.string()
        })

        const { city }  = bodySchema.parse(request.body)

        try {
            
        } catch (error) {
            
        }
    }
}