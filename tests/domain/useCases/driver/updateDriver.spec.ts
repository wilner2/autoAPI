import { ExistsDriver, UpdateDriver } from "@/domain/contracts/repos/driver";
import { UpdateDriverCase } from "@/domain/useCases/driver";
import { mock, MockProxy } from "jest-mock-extended";

describe('Update Driver Usecase', () => {
    let sut: UpdateDriverCase
    let stubUpdateDriver: MockProxy<UpdateDriver>
    let stubExistsDriver: MockProxy<ExistsDriver>
    const request = { nome: "any_nome", id: 1, status: true }
    beforeEach(() => {
        stubUpdateDriver = mock<UpdateDriver>()
        stubExistsDriver = mock<ExistsDriver>()
        sut = new UpdateDriverCase(stubUpdateDriver, stubExistsDriver)
    })
    test('should call update driver on repository', async () => {
        stubExistsDriver.exists.mockResolvedValueOnce(true)
        const spyDriverRepository = jest.spyOn(stubUpdateDriver, "update")
        const response = await sut.execute(request)

        expect(spyDriverRepository).toHaveBeenCalledTimes(1)
        expect(spyDriverRepository).toHaveBeenCalledWith({ nome: "any_nome", id: 1, status: true })
        expect(response).toEqual({ driverNotFounded: false })
    });


    test('should verify if driver exists in database', async () => {
        const spydriverRepository = jest.spyOn(stubExistsDriver, "exists")
        const response = await sut.execute(request)

        expect(spydriverRepository).toHaveBeenCalledTimes(1)
        expect(spydriverRepository).toHaveBeenCalledWith(request.id)
        expect(response).toEqual({ driverNotFounded: true })
    });
});