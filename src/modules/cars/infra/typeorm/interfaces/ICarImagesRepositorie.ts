import { CarImages } from "../entities/CarImages";



interface ICarsImagesRepository {

    create(car_id:string, image_name:string): Promise<CarImages>
    findByName(image_name:string, car_id:string):Promise<Boolean>
}

export { ICarsImagesRepository }