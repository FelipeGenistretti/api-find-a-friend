import { Pet } from "../../../generated/prisma/index.js";

export interface CadastrarPetRequest {
  name: string
  age: "FILHOTE" | "ADULTO" | "IDOSO"     
  energyLevel: number                       
  independence: "BAIXA" | "MEDIA" | "ALTA"
  environment: "PEQUENO" | "MEDIO" | "AMPLO"
  about?: string                           
  orgId: string  
}

export interface FiltroPetsRequest {
  city: string; // city quase sempre obrigatório
  age?: "FILHOTE" | "ADULTO" | "IDOSO";
  independence?: "BAIXA" | "MEDIA" | "ALTA";
  environment?: "PEQUENO" | "MEDIO" | "AMPLO";
  energyLevel?: number;
  page?: number;
  perPage?: number;
}


export interface PetRepository {
    countPetsInCity(city:string): Promise<number>;
    create(data: CadastrarPetRequest): Promise<Pet>;
    findPetsInCity(city: string, page: number, perPage: number): Promise<Pet[]>;
    filtrarPetPorCaracteristica(filtros: FiltroPetsRequest): Promise<Pet[]>;
    countPetsPorCaracteristica(filtros: FiltroPetsRequest): Promise<number>; // <- adicione isso
}
