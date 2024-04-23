import './config/configAlias'
import "reflect-metadata"
import express, { json } from 'express'
import { setupVehiclesRoute } from "./routes/automovel"
import { setupDrivesRoute } from "./routes/motorista"
import { setupRecordsRoute } from "./routes/registro"
import swaggerUi from "swagger-ui-express";
import * as bodyParser from "body-parser";
import swaggerOutput from "../../swagger_output.json";

const app = express()
app.use(json())
app.use((req, res, next) => {
    next()
})
const port = 3000

app.get('/', (req, res) => res.send('Hello World!'))

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerOutput));

setupDrivesRoute(app)
setupVehiclesRoute(app)
setupRecordsRoute(app)



app.listen(port, () => console.log(`Example app listening on port ${port}!`))