import { UpdateVehicle } from "@/contracts/repos/vehicle";
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

        const request = {
            placa: "any_placa",
            cor: "any_cor",
            marca: "any_marca",
            id: 1,
            status: true
        }
        const spyAutoRepository = jest.spyOn(stubAutoRepository, "update")
        sut.execute(request)

        expect(spyAutoRepository).toHaveBeenCalledTimes(1)
        expect(spyAutoRepository).toHaveBeenCalledWith(request)


    });
});