import { RecoveryVehicleController, RegisterVehicleController, UpdateVehicleController, DeleteVehicleController, ListVehiclesController } from '@/app/controllers'
import { UpdateVehicleCase, DeleteVehicleCase, RecoveryVehicleCase, RegisterVehicleCase, ListVehicleCase } from '@/domain/useCases/vehicles'
import { AppDataSource } from '@/infra/conf/datasource'
import { VehicleRepository } from '@/infra/repositories'
import { Router, Express } from 'express'

export const setupVehiclesRoute = (app: Express) => {
    const router = Router()

    const vehicleRepository = new VehicleRepository(AppDataSource)
    const registerVehicle = new RegisterVehicleCase(vehicleRepository)
    const registerController = new RegisterVehicleController(registerVehicle)



    router.post('/automovel', async (req, res) => {
        const result = await registerController.handle(req.body)
        res.status(result.statusCode).send(result)
    })

    const updateVehicle = new UpdateVehicleCase(vehicleRepository, vehicleRepository)
    const updateController = new UpdateVehicleController(updateVehicle)


    router.put('/automovel/:id', async (req, res) => {
        const result = await updateController.handle({ ...req.body, ...req.params })
        res.status(result.statusCode).send(result)
    })

    const deleteVehicle = new DeleteVehicleCase(vehicleRepository, vehicleRepository)
    const deleteController = new DeleteVehicleController(deleteVehicle)


    router.delete('/automovel/:id', async (req, res) => {
        const result = await deleteController.handle({ ...req.body, ...req.params })
        res.status(result.statusCode).send(result)
    })

    const recoveryVehicle = new RecoveryVehicleCase(vehicleRepository, vehicleRepository)
    const recoveryController = new RecoveryVehicleController(recoveryVehicle)


    router.patch('/automovel/:id', async (req, res) => {
        const result = await recoveryController.handle({ ...req.body, ...req.params })
        res.status(result.statusCode).send(result)
    })

    const listVehicle = new ListVehicleCase(vehicleRepository,)
    const listController = new ListVehiclesController(listVehicle)
    router.get('/automovel', async (req, res) => {
        const result = await listController.handle({ ...req.body, ...req.params, ...req.query })
        res.status(result.statusCode).send(result)
    })

    app.use(router)
}