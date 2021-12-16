import { query } from "express";
import { now } from "mongoose";
import {MigrationInterface, QueryRunner, Table, TableForeignKey} from "typeorm";

export class CreateSpecificationsCars1639670573239 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name:"specifications_cars",
                columns:[
                    {
                        name:"car_id",
                        type:"uuid"
                    },
                    {
                        name:"specification_id",
                        type:"uuid"
                    },
                    {
                        name:"cretead_at",
                        type:"timestamp",
                        default:"now()"
                    },
                ]
            })
        )

        await queryRunner.createForeignKey(
            "specifications_cars",
            new TableForeignKey({
                name:"FK_specifications_cars",
                referencedTableName:"specifications",
                referencedColumnNames:["id"],
                columnNames:["specification_id"],
                onDelete: "SET NULL",
                onUpdate: "SET NULL"
            })
        )

        await queryRunner.createForeignKey(
            "specifications_cars",
            new TableForeignKey({
                name:"FK_cars_specifications",
                referencedTableName:"cars",
                referencedColumnNames:["id"],
                columnNames:["car_id"],
                onDelete: "SET NULL",
                onUpdate: "SET NULL"
            })
        )


    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropForeignKey("specifications_cars", "FK_specifications_cars")

        await queryRunner.dropForeignKey("specifications_cars", "FK_cars_specifications")

        await queryRunner.dropTable("specifications_cars")

    }

}
