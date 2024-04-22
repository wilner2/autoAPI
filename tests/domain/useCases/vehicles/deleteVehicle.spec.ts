import { ExistsVehicle, UpdateVehicle } from "@/domain/contracts/repos/vehicle";
import { DeleteVehicleCase } from "@/domain/useCases/vehicles/deleteVehicle";
import { mock, MockProxy } from "jest-mock-extended";

describe('Delete Vehicle Usecase', () => {
    let sut: DeleteVehicleCase
    let stubUpdateVehicle: MockProxy<UpdateVehicle>
    let stubExistsVehicle: MockProxy<ExistsVehicle>
    beforeEach(() => {
        stubUpdateVehicle = mock<UpdateVehicle>()
        stubExistsVehicle = mock<ExistsVehicle>()
        sut = new DeleteVehicleCase(stubUpdateVehicle, stubExistsVehicle)
    })
    test('should call update Vehicle on repository', async () => {
        stubExistsVehicle.exists.mockResolvedValueOnce(true)
        const request = { id: "1" }
        const spyVehicleRepository = jest.spyOn(stubUpdateVehicle, "update")
        const response = await sut.execute(request)

        expect(spyVehicleRepository).toHaveBeenCalledTimes(1)
        expect(spyVehicleRepository).toHaveBeenCalledWith({ id: parseInt(request.id), status: false })
        expect(response).toEqual({ vehicleNotFounded: false })
    });


    test('should verify if vehicle exists in database', async () => {
        const request = { id: "1" }
        const spyVehicleRepository = jest.spyOn(stubExistsVehicle, "exists")
        const response = await sut.execute(request)

        expect(spyVehicleRepository).toHaveBeenCalledTimes(1)
        expect(spyVehicleRepository).toHaveBeenCalledWith(parseInt(request.id))
        expect(response).toEqual({ vehicleNotFounded: true })
    });


});