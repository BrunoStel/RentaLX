import { Column, CreateDateColumn, Entity, JoinColumn, JoinTable, ManyToMany, ManyToOne, OneToMany, PrimaryColumn } from "typeorm";
import { v4 as uuidV4 } from "uuid";

@Entity('rentals')
class Rental{
   @PrimaryColumn()
    id:string;

    @Column()
    car_id:string;

    @Column()
    user_id:string;

    @Column()
    start_date:Date;

    @Column({ nullable: true, default: null })
    end_date:Date;

    @Column()
    expected_return_date:Date;

    @Column()
    total:number;

    @Column()
    updated_date:Date;

    @CreateDateColumn()
    created_at:Date;

    constructor(){
       if(!this.id){
           this.id = uuidV4()
       }
    }
}

export{Rental}