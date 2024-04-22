import { Vehicle } from "@/domain/entities/vehicle";
import { VehicleModel } from "@/infra/entities/vehicle";
import MockDate from 'mockdate'

describe('Vehicle Domain Entity', () => {
    afterAll(() => {
        MockDate.reset()
    })

    test('should update Vehicle and return VehicleModel', () => {
        const vehicle = new Vehicle('any_placa', 'any_cor', 'any_marca')

        const request = new VehicleModel()
        request.cor = 'any_cor'
        request.marca = 'any_marca2'
        request.placa = 'any_placa1'
        request.status = true
        request.id = 1
        request.created_at = new Date()

        const vehicleUpdated = vehicle.update(request)

        expect(vehicleUpdated).toEqual({ "cor": "any_cor", "created_at": new Date(), "id": 1, "marca": "any_marca", "placa": "any_placa", "status": true })
    })
})