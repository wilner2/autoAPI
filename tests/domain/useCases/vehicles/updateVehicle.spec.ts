import { ExistsVehicle, UpdateVehicle } from "@/domain/contracts/repos/vehicle";
import { UpdateVehicleCase } from "@/domain/useCases/vehicles/updateVehicle";
import { mock, MockProxy } from "jest-mock-extended";

describe('UpdateVehicle Usecase', () => {
    let sut: UpdateVehicleCase
    let stubUpdateVehicle: MockProxy<UpdateVehicle>
    let stubExistsVehicle: MockProxy<ExistsVehicle>
    beforeEach(() => {
        stubUpdateVehicle = mock<UpdateVehicle>()
        stubExistsVehicle = mock<ExistsVehicle>()
        sut = new UpdateVehicleCase(stubUpdateVehicle, stubExistsVehicle)
    })
    test('should call update Vehicle on repository', async () => {
        stubExistsVehicle.exists.mockResolvedValueOnce(true)
        const request = {
            placa: "any_placa",
            cor: "any_cor",
            marca: "any_marca",
            id: 1,
            status: true
        }
        const spyVehicleRepository = jest.spyOn(stubUpdateVehicle, "update")
        const response = await sut.execute(request)

        expect(spyVehicleRepository).toHaveBeenCalledTimes(1)
        expect(spyVehicleRepository).toHaveBeenCalledWith(request)
        expect(response).toEqual({ vehicleNotFounded: false })
    });


    test('should verify if vehicle exists in database', async () => {

        const request = {
            placa: "any_placa",
            cor: "any_cor",
            marca: "any_marca",
            id: 1,
            status: true
        }
        const spyDriverRepository = jest.spyOn(stubExistsVehicle, "exists")
        const response = await sut.execute(request)

        expect(spyDriverRepository).toHaveBeenCalledTimes(1)
        expect(spyDriverRepository).toHaveBeenCalledWith(request.id)
        expect(response).toEqual({ vehicleNotFounded: true })
    });


});