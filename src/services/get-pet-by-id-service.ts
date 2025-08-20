import { PetRepository } from "../repositories/contracts/pet-repository.js";

class GetPetById{
    constructor(private petRepository: PetRepository) {}

    async execute(id:string){
        const pet = await this.petRepository.getPetById(id)
        if(!pet){
            throw new Error("Pet não encontrado")
        }
        return pet
    }

}

export { GetPetById }