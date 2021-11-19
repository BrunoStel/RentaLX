import { Specifications } from "../../entities/Specifications";
import { SpecificationRepositorie } from "../../repositories/SpecificationsRepository";

class ListEspecificationUseCase {
    constructor(private specificationsRepository: SpecificationRepositorie) {}

    execute(): Specifications[] {
        return this.specificationsRepository.list();
    }
}

export { ListEspecificationUseCase };
