import { container } from "tsyringe"
import { ICategoryRepositorie } from "../../modules/cars/infra/typeorm/interfaces/ICategoryRepositorie"
import { CategoriesRepository } from "../../modules/cars/infra/typeorm/repositories/CategoriesRepository"
import { SpecificationRepositorie } from "../../modules/cars/infra/typeorm/repositories/SpecificationsRepository"
import { UserRepository } from "../../modules/accounts/infra/typeorm/repositories/UserRepository"
import { ISpecificationRepositorie } from "../../modules/cars/infra/typeorm/interfaces/ISpecificationsRepositorie"
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
import { IUserTokensRepositorie } from "../../modules/accounts/infra/typeorm/interfaces/UserTokensRepositorie/IUserTokensRepositorie"
import { UserTokensRepositorie } from "../../modules/accounts/infra/typeorm/repositories/UserTokensRepositorie"
import { IMailProvider } from "../providers/MailProvider/IMailProvider"
import { EtherealMailProvider } from "../providers/MailProvider/implementations/EtherealMailProvider"
import { IStorageProvider } from "../providers/StorageProvider/IStorageProvider"
import { LocalStorageProvider } from "../providers/StorageProvider/implementations/LocalStorageProvider"
import { S3StorageProvider } from "../providers/StorageProvider/implementations/S3StorageProviders"
import { IFindByUsernameProvider } from "../providers/FindByUsername/IFindByUsernameProvider"
import { FindByUsernameProvider } from "../providers/FindByUsername/implementations/FindByUsernameProvider"
import { IEncrypterAdapter } from "../adapter/hasher/IEncrypterAdapter"
import { BCrypterAdapter } from "../adapter/hasher/Bcrypt/BCryptAdapter"
import { IUserRepositorie } from "../../modules/accounts/infra/typeorm/interfaces/UserRepositorie/IUserRepositorie"

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



container.registerSingleton<IStorageProvider>(
    "LocalStorageProvider",
    LocalStorageProvider
)

container.registerSingleton<IStorageProvider>(
    "S3StorageProvider",
    S3StorageProvider
)


container.registerSingleton<IFindByUsernameProvider>(
    "FindByUsernameProvider",
    FindByUsernameProvider
)


container.registerInstance<IEncrypterAdapter>(
    "BCrypterAdapter",
    new BCrypterAdapter(12)
)