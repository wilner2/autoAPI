import "reflect-metadata"
import './config/configAlias'
import express, { json } from 'express'
import { setupVehiclesRoute } from "./routes/vehicles"
import { setupDrivesRoute } from "./routes/motorista"
import { setupRecordsRoute } from "./routes/registros"

const app = express()
app.use(json())
app.use((req, res, next) => {
    res.type('json')
    next()
})
const port = 3000

app.get('/', (req, res) => res.send('Hello World!'))
setupVehiclesRoute(app)
setupDrivesRoute(app)
setupRecordsRoute(app)



app.listen(port, () => console.log(`Example app listening on port ${port}!`))