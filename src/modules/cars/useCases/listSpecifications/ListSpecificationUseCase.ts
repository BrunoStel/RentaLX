import { inject, injectable } from "tsyringe";
import { Specifications } from "../../entities/Specifications";
import { SpecificationRepositorie } from "../../repositories/implementations/SpecificationsRepository";



@injectable()
class ListEspecificationUseCase {
    constructor(
        @inject(SpecificationRepositorie)
        private specificationsRepository: SpecificationRepositorie) {}

    execute(): Promise<Specifications[]> {
        return this.specificationsRepository.list();
    }
}

export { ListEspecificationUseCase };
