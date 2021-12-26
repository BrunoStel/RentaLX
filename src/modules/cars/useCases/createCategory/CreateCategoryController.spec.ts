import request from "supertest"
import { app } from "../../../../shared/infra/http/app"
import createConnection from "../../../../shared/infra/database/typeorm/index"
import { Connection } from "typeorm"
import { hash } from "bcryptjs"
import {v4 as uuidV4} from "uuid";


let connection:Connection
describe("Create Category Controller", ()=>{


    beforeAll(async ()=>{
        connection = await createConnection()

        await connection.runMigrations()

        const id = uuidV4();

        const password = await hash("admin", 8);

        await connection.query(
          `INSERT INTO USERS(id, name, username, email, password, "isAdmin", created_at, driver_license)
            values('${id}', 'admin', 'admin','admin@segundaAPI.com.br', '${password}', true, 'now()', '123456789')
          `
        );
    })

    afterAll(async ()=>{
    await connection.dropDatabase()
     await connection.close()
    })


    it("should be able to create a new category", async () =>{
        const responseToken = await request(app)
        .post("/sessions")
        .send({
            username:"admin",
            password:"admin"
        })

        const {token} = responseToken.body


       const response = await request(app)
        .post("/categories")
        .send({
            name:"SuperTeste",
            description:"Descrição de categoria SUV"
        })
        .set({
            Authorization: `Bearer ${token}`
        })
        
        expect(response.status).toBe(201)


    })

    it("should not be able to create a new category that already exist", async () =>{
        const responseToken = await request(app)
        .post("/sessions")
        .send({
            username:"admin",
            password:"admin"
        })

        const {token} = responseToken.body

       const response = await request(app)
        .post("/categories")
        .send({
            name:"SuperTeste",
            description:"Descrição de categoria SUV"
        })
        .set({
            Authorization: `Bearer ${token}`
        })


        expect(response.status).toBe(400)


    })
  
})
