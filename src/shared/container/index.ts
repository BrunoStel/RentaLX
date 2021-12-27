import { container } from "tsyringe"
import { ICategoryRepositorie } from "../../modules/cars/infra/typeorm/interfaces/ICategoryRepositorie"
import { CategoriesRepository } from "../../modules/cars/infra/typeorm/repositories/CategoriesRepository"
import { SpecificationRepositorie } from "../../modules/cars/infra/typeorm/repositories/SpecificationsRepository"
import { UserRepository } from "../../modules/accounts/infra/typeorm/repositories/UserRepository"
import { ISpecificationRepositorie } from "../../modules/cars/infra/typeorm/interfaces/ISpecificationsRepositorie"
import { IUserRepositorie } from "../../modules/accounts/infra/typeorm/interfaces/IUserRepositorie"

import { ICategoryRepositorieMongo } from "../../modules/cars/infra/mongodb/interfaces/ICategoryRepositorieMongo"
import { ISpecificationRepositorieMongo } from "../../modules/cars/infra/mongodb/interfaces/ISpecificationRepositorieMongo"
import { ICarsRepositorie } from "../../modules/cars/infra/typeorm/interfaces/ICarsRepositorie"
import { CarsRepositorie } from "../../modules/cars/infra/typeorm/repositories/CarsRepository"
import { ICarsImagesRepository } from "../../modules/cars/infra/typeorm/interfaces/ICarImagesRepositorie"
import { CarImagesRepositorie } from "../../modules/cars/infra/typeorm/repositories/CarImagesRepositorie"
import { IRentalsRepositorie } from "../../modules/rentals/infra/typeorm/interfaces/IRentalsRepositorie"
import { RentalRepositorie } from "../../modules/rentals/infra/typeorm/repositories/RentalsRepositorie"
import { IDateProvider } from "../providers/DateProvider/IDateProvider"
import { DayJsDateProvider } from "../providers/DateProvider/implementations/DayJsDateProvider"
import { IUserTokensRepositorie } from "../../modules/accounts/infra/typeorm/interfaces/IUserTokensRepositorie"
import { UserTokensRepositorie } from "../../modules/accounts/infra/typeorm/repositories/UserTokensRepositorie"
import { IMailProvider } from "../providers/MailProvides/IMailProvider"
import { EtherealMailProvider } from "../providers/MailProvides/implementations/EtherealMailProvider"

container.registerSingleton<ICategoryRepositorie>(
    "CategoriesRepository",
    CategoriesRepository
)

// container.registerSingleton<ICategoryRepositorieMongo>(
//     "CategoriesRepositoryMongo",
//     CategoriesRepositoryMongo
// )

container.registerSingleton<ISpecificationRepositorie>(
    "SpecificationRepositorie",
    SpecificationRepositorie
)

// container.registerSingleton<ISpecificationRepositorieMongo>(
//     "SpecificationRepositorieMongo",
//     SpecificationRepositorieMongo
// )

container.registerSingleton<IUserRepositorie>(
    "UserRepository",
    UserRepository
)

container.registerSingleton<ICarsRepositorie>(
    "CarsRepositorie",
    CarsRepositorie
)

container.registerSingleton<ICarsImagesRepository>(
    "CarImagesRepositorie",
    CarImagesRepositorie
)

container.registerSingleton<IRentalsRepositorie>(
    "RentalRepositorie",
    RentalRepositorie
)

container.registerSingleton<IDateProvider>(
    "DayJsDateProvider",
    DayJsDateProvider
)

container.registerSingleton<IUserTokensRepositorie>(
    "UserTokensRepositorie",
    UserTokensRepositorie
)



container.registerInstance<IMailProvider>(
    "EtherealMailProvider",
    new EtherealMailProvider()
)
