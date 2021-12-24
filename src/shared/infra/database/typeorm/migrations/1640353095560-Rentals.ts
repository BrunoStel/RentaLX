import {MigrationInterface, QueryRunner, Table} from "typeorm";

export class Rentals1640353095560 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name:'rentals',
                columns:[
                    {
                        name:'id',
                        type:'uuid',
                        isPrimary: true
                    },
                    {
                        name:'car_id',
                        type:'uuid',
                    },
                    {
                        name:'user_id',
                        type:'uuid',
                    },
                    {
                        name:'start_date',
                        type:'timestamp',
                    },
                    {
                        name:'end_date',
                        type:'timestamp',
                    },
                    {
                        name:'expected_return_date',
                        type:'timestamp',
                    },
                    {
                        name:'total',
                        type:'numeric',
                    },
                    {
                        name:'created_at',
                        type:'timestamp',
                        default:'now()'
                    },
                    {
                        name:'updated_date',
                        type:'timestamp',
                    },
                ],
                foreignKeys:[
                    {
                        name:"FKUserId",
                        referencedTableName:"users",
                        referencedColumnNames:["id"],
                        columnNames: ["user_id"],
                        onDelete: "SET NULL",
                        onUpdate: "SET NULL"
                    },
                    {
                        name:"FKCarId",
                        referencedTableName:"cars",
                        referencedColumnNames:["id"],
                        columnNames: ["car_id"],
                        onDelete: "SET NULL",
                        onUpdate: "SET NULL"
                    }
                ]
            })
        )
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable("rentals")
    }

}
