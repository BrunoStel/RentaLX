import {Request, Response } from 'express'
import { container } from 'tsyringe'
import { UploadImagesUseCase } from './UploadImagesUseCase'


interface IFiles{
    filename:string
}


class UploadImagesController {

    async handle(request:Request, response:Response) : Promise<Response>{
        const { id } = request.params

        const images = request.files as IFiles[]
    
        const fileNames = images.map(fileName => fileName.filename)


        const uploadImagesUseCase = container.resolve(UploadImagesUseCase)

        const cars = await uploadImagesUseCase.execute({
            car_id:id,
            images_name : fileNames
        })

        if(cars.length === 0){
            return response.status(400).json({"Message":'All the images are already registered for this car'})
        }

        return response.status(201).json(cars)
    }

}

export { UploadImagesController }