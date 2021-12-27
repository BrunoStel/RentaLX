import { inject, injectable } from "tsyringe";
import { Rental } from "../../infra/typeorm/entities/Rentals";
import { IRentalsRepositorie } from "../../infra/typeorm/interfaces/IRentalsRepositorie";


@injectable()
class ListRentalByUserUseCase{

    constructor(
        @inject('RentalRepositorie')
        private rentalRepositorie: IRentalsRepositorie
    ){}

    async execute(id:string): Promise<Rental[]>{
        const rentals = await this.rentalRepositorie.findRentalsById(id)
        
        return rentals
    }


}

export { ListRentalByUserUseCase }