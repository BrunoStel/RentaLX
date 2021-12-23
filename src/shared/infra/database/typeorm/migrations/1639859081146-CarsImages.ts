import {MigrationInterface, QueryRunner, Table} from "typeorm";

export class CarsImages1639859081146 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name:"car_images",
                columns:[
                    {
                        name:'id',
                        type:'uuid',
                        isPrimary: true
                    },
                    {
                        name:'image_name',
                        type:'varchar'
                    },
                    {
                        name:"car_id",
                        type:"uuid",
                        isNullable:true
                    },
                    {
                        name:'created_at',
                        type:"timestamp",
                        default:'now()'
                    }

                ],
                foreignKeys:[
                    {
                        name:"FKCarId",
                        referencedTableName:"cars",
                        referencedColumnNames:["id"],
                        columnNames: ["car_id"],
                        onDelete: "SET NULL",
                        onUpdate: "SET NULL"
                    }
                ]
            }
            )
        )


    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable("car_images")
    }

}
