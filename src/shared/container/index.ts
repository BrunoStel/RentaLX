import { container } from "tsyringe"
import { ICategoryRepositorie } from "../../modules/cars/infra/typeorm/interfaces/ICategoryRepositorie"
import { CategoriesRepository } from "../../modules/cars/infra/typeorm/repositories/CategoriesRepository"
import { SpecificationRepositorie } from "../../modules/cars/infra/typeorm/repositories/SpecificationsRepository"
import { UserRepository } from "../../modules/accounts/infra/typeorm/repositories/UserRepository"
import { ISpecificationRepositorie } from "../../modules/cars/infra/typeorm/interfaces/ISpecificationsRepositorie"
import { IUserRepositorie } from "../../modules/accounts/infra/typeorm/interfaces/IUserRepositorie"
import { SpecificationRepositorieMongo } from "../../modules/cars/infra/mongodb/repositories/SpecificationRepositoryMongo"
import { CategoriesRepositoryMongo } from "../../modules/cars/infra/mongodb/repositories/CategoriesRepositoryMongo"
import { ICategoryRepositorieMongo } from "../../modules/cars/infra/mongodb/interfaces/ICategoryRepositorieMongo"
import { ISpecificationRepositorieMongo } from "../../modules/cars/infra/mongodb/interfaces/ISpecificationRepositorieMongo"

container.registerSingleton<ICategoryRepositorie>(
    "CategoriesRepository",
    CategoriesRepository
)

container.registerSingleton<ICategoryRepositorieMongo>(
    "CategoriesRepositoryMongo",
    CategoriesRepositoryMongo
)

container.registerSingleton<ISpecificationRepositorie>(
    "SpecificationRepositorie",
    SpecificationRepositorie
)

container.registerSingleton<ISpecificationRepositorieMongo>(
    "SpecificationRepositorieMongo",
    SpecificationRepositorieMongo
)

container.registerSingleton<IUserRepositorie>(
    "UserRepository",
    UserRepository
)