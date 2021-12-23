import { inject, injectable } from "tsyringe";
import { AppError } from "../../../../shared/errors/AppError";
import { deleteFile } from "../../../../utils/file";
import { CarImages } from "../../infra/typeorm/entities/CarImages";
import { CarImagesRepositorie } from "../../infra/typeorm/repositories/CarImagesRepositorie";
import { CarsRepositorie } from "../../infra/typeorm/repositories/CarsRepository";


interface IRequest{
    car_id:string,
    images_name:string[]
}

@injectable()
class UploadImagesUseCase {

    constructor(
        @inject('CarImagesRepositorie')
        private carImagesRepositorie : CarImagesRepositorie,
        @inject('CarsRepositorie')
        private carsRepositorie : CarsRepositorie
    ){}



    async execute({car_id, images_name}:IRequest): Promise<CarImages[]>{

        //Verificando se as imagens já existem para esse carro

        let images:CarImages[] = []

        await Promise.all(
            images_name.map(async elem =>{
            
            const imageName = elem.split('-')[1]

            const imageAlreadyExists = await this.carImagesRepositorie.findByName(imageName,car_id)

            if(imageAlreadyExists === false){

                const image = await this.carImagesRepositorie.create(car_id, elem)

                images.push(image)
            }else{
                await deleteFile(`./tmp/cars/${elem}`)
                
            }

            })
        )
    
        return images

    }


}


export { UploadImagesUseCase }