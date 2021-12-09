import { ICreateCategoryDTO } from "../../infra/typeorm/interfaces/ICategoryRepositorie";
import { inject, injectable } from "tsyringe"
import { AppError } from "../../../../shared/errors/AppError";
import { ISpecificationRepositorie } from "../../infra/typeorm/interfaces/ISpecificationsRepositorie";
import { ISpecificationRepositorieMongo } from "../../infra/mongodb/interfaces/ISpecificationRepositorieMongo";


@injectable()
class CreateSpecificationUseCase {
    constructor(
        @inject("SpecificationRepositorieMongo")
        private specificationRepositorieMongo: ISpecificationRepositorieMongo ,
        @inject("SpecificationRepositorie")
        private specificationRepositorie: ISpecificationRepositorie ) {}

    async execute({ name, description }: ICreateCategoryDTO): Promise<void> {
        const specificationAlreadyExistsMongo =
           await this.specificationRepositorieMongo.findByName(name);
          
        const specificationAlreadyExists =
            await this.specificationRepositorie.findByName(name);

        if (specificationAlreadyExistsMongo || specificationAlreadyExists) {
            throw new AppError("Specification already exists");
        }

        await this.specificationRepositorieMongo.create({ name, description });
        await this.specificationRepositorie.create({ name, description });
    }
}

export { CreateSpecificationUseCase };
