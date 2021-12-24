import { Column, CreateDateColumn, Entity, JoinColumn, JoinTable, ManyToMany, ManyToOne, OneToMany, PrimaryColumn } from "typeorm";
import { v4 as uuidV4 } from "uuid";
import { CarImages } from "./CarImages";
import { Category } from "./Category";
import { Specifications } from "./Specifications";




@Entity('cars')
class Car{
   @PrimaryColumn()
    id:string;

    @Column()
    name:string;

    @Column()
    description:string;

    @Column()
    daily_rate:number;

    @Column()
    available:boolean = true;

    @Column()
    license_plate:string;

    @Column()
    fine_amount:number;

    @Column()
    brand:string;

    @ManyToOne(()=> Category)
    @JoinColumn({name:"category_id"})
    category:Category

    @Column({select: false})
    category_id:string;

    @ManyToMany(()=> Specifications )
    @JoinTable({
        name:"specifications_cars",
        joinColumns:[{name:"car_id"}],
        inverseJoinColumns:[{name:"specification_id"}]
    })
    specifications: Specifications[];

    @OneToMany(() => CarImages, carImages => carImages.car)
    car_images: CarImages[];


    @CreateDateColumn()
    created_at:Date;

    constructor(){
       if(!this.id){
           this.id = uuidV4()
       }
    }
}

export{Car}