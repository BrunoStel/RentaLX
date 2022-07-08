import { Connection, createConnection, getConnectionOptions } from 'typeorm';


interface IOptions {
  host: string;
}



 export default async (): Promise<Connection> =>{
  const defaultOptions = await  getConnectionOptions()

//   return createConnection(
//     Object.assign(defaultOptions,{
//     host:process.env.NODE_ENV === 'test' ? 'localhost' : host,
//     database:
//       process.env.NODE_ENV === "test"
//         ? "rentx"
//         : defaultOptions.database,
//     })
//   )
    return createConnection(
        Object.assign(defaultOptions,{
        host:"rentalx.cn6ixw4wtuy5.us-east-1.rds.amazonaws.com",
        port: 5432,
        username:"postgres",
        password: "postgres",
        database: "rentalx"
        })
    )
}

getConnectionOptions().then(options => {
createConnection({
    ...options,
});
});


