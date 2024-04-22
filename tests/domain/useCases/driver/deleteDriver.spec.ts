import { ExistsDriver, UpdateDriver } from "@/domain/contracts/repos/driver";
import { DeleteDriverCase } from "@/domain/useCases/driver";
import { mock, MockProxy } from "jest-mock-extended";

describe('Delete Driver Usecase', () => {
    let sut: DeleteDriverCase
    let stubUpdateDriver: MockProxy<UpdateDriver>
    let stubExistsDriver: MockProxy<ExistsDriver>
    beforeEach(() => {
        stubUpdateDriver = mock<UpdateDriver>()
        stubExistsDriver = mock<ExistsDriver>()
        sut = new DeleteDriverCase(stubUpdateDriver, stubExistsDriver)
    })
    test('should call update driver on repository', async () => {
        stubExistsDriver.exists.mockResolvedValueOnce(true)
        const request = { id: "1" }
        const spydriverRepository = jest.spyOn(stubUpdateDriver, "update")
        const response = await sut.execute(request)

        expect(spydriverRepository).toHaveBeenCalledTimes(1)
        expect(spydriverRepository).toHaveBeenCalledWith({ id: parseInt(request.id), status: false })
        expect(response).toEqual({ driverNotFounded: false })
    });


    test('should verify if driver exists in database', async () => {
        const request = { id: "1" }
        const spydriverRepository = jest.spyOn(stubExistsDriver, "exists")
        const response = await sut.execute(request)

        expect(spydriverRepository).toHaveBeenCalledTimes(1)
        expect(spydriverRepository).toHaveBeenCalledWith(parseInt(request.id))
        expect(response).toEqual({ driverNotFounded: true })
    });


});