import { DeleteVehicleController } from '@/app/controllers/vehicles/deleteVehicle'
import { RecoveryVehicleController, RegisterVehicleController, UpdateVehicleController } from '@/app/controllers/'
import { DeleteVehicleCase } from '@/domain/useCases/vehicles.ts/deleteVehicle'
import { RecoveryVehicleCase } from '@/domain/useCases/vehicles.ts/recoveryVehicle'
import { RegisterVehicleCase } from '@/domain/useCases/vehicles.ts/registerVehicle'
import { UpdateVehicleCase } from '@/domain/useCases/vehicles.ts/updateVehicle'
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

    app.use(router)
}