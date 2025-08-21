import { Pet } from "../../../generated/prisma/index.js";
import { prisma } from "../../http/lib/prisma.js";
import { CadastrarPetRequest, FiltroPetsRequest, PetRepository } from "../contracts/pet-repository.js";

class PrismaPetRepository implements PetRepository {
  async getPetById(id: string): Promise<Pet> {
    const pet = await prisma.pet.findUnique({
      where: { id },
      include: { Org: true }
    });

    return pet;
  }

  async filtrarPetPorCaracteristica(filtros: FiltroPetsRequest): Promise<Pet[]> {
    const { city, age, independence, environment, energyLevel, page = 1, perPage = 10 } = filtros;

    const where: any = {};

    if (city) {
      where.Org = { city: city };
    }

    if (age) {
      where.age = age;
    }

    if (independence) {
      where.independence = independence;
    }

    if (environment) {
      where.environment = environment;
    }

    if (energyLevel) {
      where.energyLevel = energyLevel;
    }

    const pets = await prisma.pet.findMany({
      where,
      include: { Org: true },
      skip: (page - 1) * perPage,
      take: perPage
    });

    return pets;
  }

  async countPetsInCity(city: string): Promise<number> {
    const total = await prisma.pet.count({
      where: {
        Org: {
          city: city
        }
      }
    });

    return total;
  }

  async countPetsPorCaracteristica(filtros: FiltroPetsRequest): Promise<number> {
    const { city, age, independence, environment, energyLevel } = filtros;

    const where: any = {};

    if (city) {
      where.Org = { city: city };
    }

    if (age) {
      where.age = age;
    }

    if (independence) {
      where.independence = independence;
    }

    if (environment) {
      where.environment = environment;
    }

    if (energyLevel) {
      where.energyLevel = energyLevel;
    }

    const total = await prisma.pet.count({
      where
    });

    return total;
  }

  async findPetsInCity(city: string, page = 1, perPage = 10): Promise<Pet[]> {
    const pets = await prisma.pet.findMany({
      where: {
        Org: {
          city,
        },
      },
      include: {
        Org: true,
      },
      skip: (page - 1) * perPage,
      take: perPage
    });

    return pets;
  }

  async create(data: CadastrarPetRequest): Promise<Pet> {
    const pet = await prisma.pet.create({
      data
    });

    return pet;
  }
}

export { PrismaPetRepository };
