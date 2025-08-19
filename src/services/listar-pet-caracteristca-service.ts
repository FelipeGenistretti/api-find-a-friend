import { Pet } from "../../generated/prisma/index.js";
import { PetRepository } from "../repositories/contracts/pet-repository.js";
import { FiltroPetsRequest } from "../repositories/contracts/pet-repository.js";

export interface ListarPetsCaracteristicaResponse {
    pets: Pet[];
    page: number;
    perPage: number;
    total: number;
    totalPages: number;
}

class ListarPetsCaracteristicaService {
    constructor(private petRepository: PetRepository) {}

    async execute(filtros: FiltroPetsRequest): Promise<ListarPetsCaracteristicaResponse> {
        const { page = 1, perPage = 10 } = filtros;

        const pets = await this.petRepository.filtrarPetPorCaracteristica(filtros);

        const total = await this.petRepository.countPetsPorCaracteristica(filtros);

      
        if (pets.length === 0) {
            throw new Error("Não tem pets que batem com esses filtros");
        }

        return {
            pets,
            page,
            perPage,
            total,
            totalPages: Math.ceil(total / perPage),
        };
    }
}

export { ListarPetsCaracteristicaService };
