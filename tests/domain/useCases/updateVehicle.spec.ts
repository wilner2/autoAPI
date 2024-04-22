import { UpdateVehicle } from "@/contracts/repos/vehicle";
import { Vehicle } from "@/domain/entities/vehicle";
import { UpdateAutoCase } from "@/domain/useCases/updateVehicle";
import { mock, MockProxy } from "jest-mock-extended";

describe('UpdateAuto Usecase', () => {
    let sut: UpdateAutoCase
    let stubAutoRepository: MockProxy<UpdateVehicle>
    beforeEach(() => {
        stubAutoRepository = mock<UpdateVehicle>()
        sut = new UpdateAutoCase(stubAutoRepository)
    })
    test('should call update Vehicle on repository', async () => {

        const request = new Vehicle('any_placa', 'any_cor', 'any_marca', 1, true)

        const spyAutoRepository = jest.spyOn(stubAutoRepository, "update")
        sut.execute(request)

        expect(spyAutoRepository).toHaveBeenCalledTimes(1)
        expect(spyAutoRepository).toHaveBeenCalledWith(request)


    });
});