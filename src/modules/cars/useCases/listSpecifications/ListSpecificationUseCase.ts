import { inject, injectable } from "tsyringe";
import { Specifications } from "../../entities/Specifications";
import { SpecificationRepositorieMongo } from "../../repositories/implementations/SpecificationRepositoryMongo";
import { SpecificationRepositorie } from "../../repositories/implementations/SpecificationsRepository";
import { ISpecificationRepositorieMongo } from "../../repositories/ISpecificationRepositorieMongo";
import { ISpecificationRepositorie } from "../../repositories/ISpecificationsRepositorie";



@injectable()
class ListEspecificationUseCase {
    constructor(
        @inject(SpecificationRepositorie)
        private specificationsRepository: ISpecificationRepositorie) {}

    execute(): Promise<Specifications[]> {
        return this.specificationsRepository.list()
    }
}

export { ListEspecificationUseCase };
