import { container } from "tsyringe"
import { ICategoryRepositorie } from "../../modules/cars/repositories/ICategoryRepositorie"
import { CategoriesRepository } from "../../modules/cars/repositories/implementations/CategoriesRepository"
import { SpecificationRepositorie } from "../../modules/cars/repositories/implementations/SpecificationsRepository"
import { UserRepository } from "../../modules/cars/repositories/implementations/UserRepository"
import { ISpecificationRepositorie } from "../../modules/cars/repositories/ISpecificationsRepositorie"
import { IUserRepositorie } from "../../modules/cars/repositories/IUserRepositorie"

container.registerSingleton<ICategoryRepositorie>(
    "CategoriesRepository",
    CategoriesRepository
)

container.registerSingleton<ISpecificationRepositorie>(
    "SpecificationRepositorie",
    SpecificationRepositorie
)


container.registerSingleton<IUserRepositorie>(
    "UserRepository",
    UserRepository
)