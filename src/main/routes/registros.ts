import { ListRecordController, FinishRecordController, RegisterRecordController } from '@/app/controllers'
import { ListRecordCase, RegisterRecordCase, finishRecordCase } from '@/domain/useCases/record'
import { AppDataSource } from '@/infra/conf/datasource'
import { RecordRepository } from '@/infra/repositories'
import { Router, Express } from 'express'

export const setupRecordsRoute = (app: Express) => {
    const router = Router()

    const recordRepository = new RecordRepository(AppDataSource)
    const registerRecord = new RegisterRecordCase(recordRepository, recordRepository)
    const registerController = new RegisterRecordController(registerRecord)



    router.post('/registro', async (req, res) => {
        const result = await registerController.handle(req.body)
        res.status(result.statusCode).send(result)
    })

    const finishRecord = new finishRecordCase(recordRepository)
    const finish = new FinishRecordController(finishRecord)


    router.patch('/registro/:id', async (req, res) => {
        const result = await finish.handle({ ...req.body, ...req.params })
        res.status(result.statusCode).send(result)
    })

    const listRecord = new ListRecordCase(recordRepository)
    const listController = new ListRecordController(listRecord)


    router.get('/registro', async (req, res) => {
        const result = await listController.handle({ ...req.body, ...req.params, ...req.query })
        res.status(result.statusCode).send(result)
    })



    app.use(router)
}