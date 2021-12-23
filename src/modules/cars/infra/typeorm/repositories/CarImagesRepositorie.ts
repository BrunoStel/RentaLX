import { getRepository, Repository } from "typeorm";
import { CarImages } from "../entities/CarImages";
import { ICarsImagesRepository } from "../interfaces/ICarImagesRepositorie";



class CarImagesRepositorie implements ICarsImagesRepository{
    private repository: Repository<CarImages>

    constructor(){
        this.repository = getRepository(CarImages)
    }


    async create(car_id: string, image_name: string): Promise<CarImages> {
        const carImage = this.repository.create({
            car_id,
            image_name
        })

        await this.repository.save(carImage)

        return carImage
    }

    async findByName(image_name:string, car_id:string):Promise<Boolean>{
        const images = await this.repository.find()

        let imageExists:boolean = false

        images.map(elem=>{
            const imageName = elem.image_name.split('-')[1]

            if(imageName === image_name && elem.car_id === car_id){
                imageExists = true
            }

        })

        return imageExists
    }
    
}

export { CarImagesRepositorie }