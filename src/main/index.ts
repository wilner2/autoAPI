import "reflect-metadata"
import './config/configAlias'
import express, { json } from 'express'
import { RegisterAutoController } from "@/app/controllers/registerAuto"
import { RegisterAutoCase } from "@/domain/useCases/registerAuto"
import { AutoRepository } from "@/infra/repositories/autoRepo"
import { AppDataSource } from "@/infra/conf/datasource"


const autoRepository = new AutoRepository(AppDataSource)
const registerAuto = new RegisterAutoCase(autoRepository)
const controller = new RegisterAutoController(registerAuto)
const app = express()
app.use(json())
app.use((req, res, next) => {
    res.type('json')
    next()
})
const port = 3000
app.use
app.post('/automovel', async (req, res) => {
    console.log(req.body);

    const result = await controller.handle(req.body)
    res.status(result.statusCode).send(result)
})
app.get('/', (req, res) => res.send('Hello World!'))
app.listen(port, () => console.log(`Example app listening on port ${port}!`))