import { container } from "tsyringe"
import { ICategoryRepositorie } from "../../modules/cars/repositories/ICategoryRepositorie"
import { CategoriesRepository } from "../../modules/cars/repositories/implementations/CategoriesRepository"
import { SpecificationRepositorie } from "../../modules/cars/repositories/implementations/SpecificationsRepository"
import { UserRepository } from "../../modules/accounts/repositories/implementations/UserRepository"
import { ISpecificationRepositorie } from "../../modules/cars/repositories/ISpecificationsRepositorie"
import { IUserRepositorie } from "../../modules/accounts/repositories/IUserRepositorie"
import { SpecificationRepositorieMongo } from "../../modules/cars/repositories/implementations/SpecificationRepositoryMongo"
import { CategoriesRepositoryMongo } from "../../modules/cars/repositories/implementations/CategoriesRepositoryMongo"

container.registerSingleton<ICategoryRepositorie>(
    "CategoriesRepository",
    CategoriesRepository
)

container.registerSingleton<ICategoryRepositorie>(
    "CategoriesRepositoryMongo",
    CategoriesRepositoryMongo
)

container.registerSingleton<ISpecificationRepositorie>(
    "SpecificationRepositorie",
    SpecificationRepositorie
)

container.registerSingleton<ISpecificationRepositorie>(
    "SpecificationRepositorieMongo",
    SpecificationRepositorieMongo
)

container.registerSingleton<IUserRepositorie>(
    "UserRepository",
    UserRepository
)