import { VehicleModel, DriverModel, RecordModel } from "@/infra/entities";
import { DataSource } from "typeorm";

export const AppDataSource = new DataSource({
    type: "postgres",
    host: process.env.HOST,
    port: parseInt(process.env.PORT || '32768'),
    username: process.env.USERDB,
    password: process.env.PASSWORDDB,
    database: process.env.DATABASE,
    schema: process.env.SCHEMA,
    synchronize: true,
    logging: false,
    subscribers: [],
    entities: [VehicleModel, DriverModel, RecordModel],
    migrations: [],
})
AppDataSource.initialize()
    .then(() => {
        console.log('Data Source has been initialized!')
        parseInt('2')
    })
    .catch((err) => {
        console.error('Error during Data Source initialization', err)
    })