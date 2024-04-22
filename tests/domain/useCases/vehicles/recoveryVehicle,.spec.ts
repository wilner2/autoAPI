import { ExistsVehicle, UpdateVehicle } from "@/domain/contracts/repos/vehicle";
import { RecoveryVehicleCase } from "@/domain/useCases/vehicles.ts/recoveryVehicle";
import { mock, MockProxy } from "jest-mock-extended";

describe('UpdateAuto Usecase', () => {
    let sut: RecoveryVehicleCase
    let stubUpdateVehicle: MockProxy<UpdateVehicle>
    let stubExistsVehicle: MockProxy<ExistsVehicle>
    beforeEach(() => {
        stubUpdateVehicle = mock<UpdateVehicle>()
        stubExistsVehicle = mock<ExistsVehicle>()
        sut = new RecoveryVehicleCase(stubUpdateVehicle, stubExistsVehicle)
    })
    test('should call update Vehicle on repository', async () => {
        stubExistsVehicle.exists.mockResolvedValueOnce(true)
        const request = { id: "1" }
        const spyVehicleRepository = jest.spyOn(stubUpdateVehicle, "update")
        const response = await sut.execute(request)

        expect(spyVehicleRepository).toHaveBeenCalledTimes(1)
        expect(spyVehicleRepository).toHaveBeenCalledWith({ id: parseInt(request.id), status: true })
        expect(response).toEqual({ vehicleNotFounded: false })
    });


    test('should verify if vehicle exists in database', async () => {
        const request = { id: "1" }
        const spyAutoRepository = jest.spyOn(stubExistsVehicle, "exists")
        const response = await sut.execute(request)

        expect(spyAutoRepository).toHaveBeenCalledTimes(1)
        expect(spyAutoRepository).toHaveBeenCalledWith(parseInt(request.id))
        expect(response).toEqual({ vehicleNotFounded: true })
    });


});