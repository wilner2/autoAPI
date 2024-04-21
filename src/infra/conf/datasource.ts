import { Auto } from "@/infra/entities/auto";
import { DataSource } from "typeorm";

export const AppDataSource = new DataSource({
    type: "postgres",
    host: "192.168.0.10",
    port: 32768,
    username: "postgres",
    password: "postgrespw",
    database: "postgres",
    schema: "public",
    synchronize: true,
    logging: false,
    entities: [Auto],
    subscribers: [],
    migrations: [],
})
AppDataSource.initialize()
    .then(() => {
        console.log('Data Source has been initialized!')
    })
    .catch((err) => {
        console.error('Error during Data Source initialization', err)
    })