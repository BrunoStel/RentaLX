import { container } from "tsyringe"
import { ICategoryRepositorie } from "../../modules/cars/repositories/ICategoryRepositorie"
import { CategoriesRepository } from "../../modules/cars/repositories/implementations/CategoriesRepository"
import { SpecificationRepositorie } from "../../modules/cars/repositories/implementations/SpecificationsRepository"
import { ISpecificationRepositorie } from "../../modules/cars/repositories/ISpecificationsRepositorie"


container.registerSingleton<ICategoryRepositorie>(
    "CategoriesRepository",
    CategoriesRepository
)


container.registerSingleton<ISpecificationRepositorie>(
    "SpecificationRepositorie",
    SpecificationRepositorie
)