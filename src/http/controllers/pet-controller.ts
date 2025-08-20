import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";
import { makeCadastrarPetService } from "../../services/factories/make-cadastrar-pet-service.js";
import { makeListarPetCityService } from "../../services/factories/make-listar-pets-city-service.js";
import { makeListarPetCaracteristicaService } from "../../services/factories/make-listar-pet-caracteristca-service.js";
import { makeGetPetByIdService } from "../../services/factories/make-get-pet-by-id-service.js";

class PetController{
        async list_pets_in_city(request: FastifyRequest, response: FastifyReply) {
            const querySchema = z.object({
                city: z.string(),
                page: z.coerce.number().min(1).default(1),
                perPage: z.coerce.number().min(1).max(50).default(10)
            });

            try {
                const { city, page, perPage } = querySchema.parse(request.query);

                const listarPetCityService = makeListarPetCityService();
                const result = await listarPetCityService.execute(city, page, perPage);

                return response.status(200).send(result);

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

        async cadastrar_pet(request:FastifyRequest, response: FastifyReply){
            const bodySchema = z.object({
                name:z.string(),
                age:z.enum(["FILHOTE", "ADULTO", "IDOSO"]),
                energyLevel : z.number().min(1).max(5),
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

    async listar_pet_caracteristica(request:FastifyRequest, response:FastifyReply){
        const querySchema = z.object({
            city:z.string().min(2),
            age:z.enum(["FILHOTE", "ADULTO", "IDOSO"]).optional(),
            independence:z.enum(["BAIXA", "MEDIA", "ALTA"]).optional(),
            environment: z.enum(["PEQUENO", "MEDIO", "AMPLO"]).optional(),
            energyLevel : z.number().min(1).max(5).optional(),
            page: z.coerce.number().min(1).default(1),
            perPage: z.coerce.number().min(1).max(50).default(10),
        })

        const data = await querySchema.parseAsync(request.query)

        try {
            const listarPetCaracteritica = makeListarPetCaracteristicaService()
            const result = await listarPetCaracteritica.execute(data)
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

    async get_pet_by_id(request:FastifyRequest, response:FastifyReply){
        const paramSchema = z.object({
            id:z.string().uuid()
        })

        const { id } = await paramSchema.parse(request.params)

        try {
            const getPetByIdService = makeGetPetByIdService()
            const pet = await getPetByIdService.execute(id)
            return response.status(200).send(pet)
        } catch (error) {
            if (error instanceof Error && error.message === "Pet não encontrado") {
                return response.status(404).send({ message: error.message });
            }

         return response.status(500).send({ message: (error as Error).message || "Erro interno no servidor" });
        }

    }

    
}

export { PetController }