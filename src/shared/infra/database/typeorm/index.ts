import { Connection, createConnection, getConnectionOptions } from 'typeorm';


interface IOptions {
  host: string;
}



 export default async (): Promise<Connection> =>{
  const defaultOptions = await  getConnectionOptions()
    return createConnection(
        Object.assign(defaultOptions,{
        host:process.env.HOST_PG,
        port: 5432,
        username:process.env.USERNAME_PG,
        password: process.env.PASSWORD_PG,
        database: "rentalx"
        })
    )
}

getConnectionOptions().then(options => {
createConnection({
    ...options,
});
});


