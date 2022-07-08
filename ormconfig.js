module.exports = {
    type: "postgres",
    port: 5432,
    host: process.env.HOST_PG, 
    username: process.env.USERNAME_PG,
    password:  process.env.PASSWORD_PG,
    database: "RentalX", 
    migrations: ["./src/shared/infra/database/typeorm/migrations/*.ts"],
    entities: ["./src/modules/**/entities/*.ts"],
    cli: {
     migrationsDir: "./src/shared/infra/database/typeorm/migrations"
    }
  }