import { inject, injectable } from "tsyringe";
import { Specifications } from "../../infra/typeorm/entities/Specifications";
import { SpecificationRepositorie } from "../../infra/typeorm/repositories/SpecificationsRepository";
import { ISpecificationRepositorie } from "../../infra/typeorm/interfaces/ISpecificationsRepositorie";



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
