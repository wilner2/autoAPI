import { DeleteDriverController, ListDriverController, RecoveryDriverController, UpdateDriverController, RegisterDriverController } from '@/app/controllers'
import { UpdateDriverCase, DeleteDriverCase, RecoveryDriverCase, RegisterDriverCase, ListDriverCase } from '@/domain/useCases/driver'
import { AppDataSource } from '@/infra/conf/datasource'
import { DriverRepository } from '@/infra/repositories'
import { Router, Express } from 'express'

export const setupDrivesRoute = (app: Express) => {
    const router = Router()

    const driverRepository = new DriverRepository(AppDataSource)
    const registerDrive = new RegisterDriverCase(driverRepository)
    const registerController = new RegisterDriverController(registerDrive)



    router.post('/motorista', async (req, res) => {
        const result = await registerController.handle(req.body)
        res.status(result.statusCode).send(result)
    })

    const updateDrive = new UpdateDriverCase(driverRepository, driverRepository)
    const updateController = new UpdateDriverController(updateDrive)


    router.put('/motorista/:id', async (req, res) => {
        const result = await updateController.handle({ ...req.body, ...req.params })
        res.status(result.statusCode).send(result)
    })

    const deleteDrive = new DeleteDriverCase(driverRepository, driverRepository)
    const deleteController = new DeleteDriverController(deleteDrive)


    router.delete('/motorista/:id', async (req, res) => {
        const result = await deleteController.handle({ ...req.body, ...req.params })
        res.status(result.statusCode).send(result)
    })

    const recoveryDrive = new RecoveryDriverCase(driverRepository, driverRepository)
    const recoveryController = new RecoveryDriverController(recoveryDrive)


    router.patch('/motorista/:id', async (req, res) => {
        const result = await recoveryController.handle({ ...req.body, ...req.params })
        res.status(result.statusCode).send(result)
    })


    const listDriver = new ListDriverCase(driverRepository,)
    const listController = new ListDriverController(listDriver)
    router.get('/motorista', async (req, res) => {
        const result = await listController.handle({ ...req.body, ...req.params, ...req.query })
        res.status(result.statusCode).send(result)
    })

    app.use(router)
}