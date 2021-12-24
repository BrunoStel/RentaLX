import { Column, Entity, JoinColumn, ManyToOne, PrimaryColumn } from "typeorm";
import { v4 as uuidV4 } from "uuid";
import { Car } from "./Car";



@Entity('car_images')
class CarImages{
    @PrimaryColumn()
    id:string

    @Column()
    image_name:string

    @Column()
    car_id:string

    @Column()
    created_at:Date

    @ManyToOne(() => Car, car => car.car_images, { eager:true })
    @JoinColumn({name:'car_id'})
    car : Car;

    constructor(){
        if(!this.id){
            this.id = uuidV4()
        }
     }

}

export{CarImages}