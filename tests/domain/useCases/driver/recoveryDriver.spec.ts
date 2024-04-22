import { ExistsDriver, UpdateDriver } from "@/domain/contracts/repos/driver";
import { RecoveryDriverCase } from "@/domain/useCases/driver";
import { mock, MockProxy } from "jest-mock-extended";

describe('Update Driver Usecase', () => {
    let sut: RecoveryDriverCase
    let stubUpdateDriver: MockProxy<UpdateDriver>
    let stubExistsDriver: MockProxy<ExistsDriver>
    beforeEach(() => {
        stubUpdateDriver = mock<UpdateDriver>()
        stubExistsDriver = mock<ExistsDriver>()
        sut = new RecoveryDriverCase(stubUpdateDriver, stubExistsDriver)
    })
    test('should call update Driver on repository', async () => {
        stubExistsDriver.exists.mockResolvedValueOnce(true)
        const request = { id: "1" }
        const spyDriverRepository = jest.spyOn(stubUpdateDriver, "update")
        const response = await sut.execute(request)

        expect(spyDriverRepository).toHaveBeenCalledTimes(1)
        expect(spyDriverRepository).toHaveBeenCalledWith({ id: parseInt(request.id), status: true })
        expect(response).toEqual({ driverNotFounded: false })
    });


    test('should verify if Driver exists in database', async () => {
        const request = { id: "1" }
        const spyDriverRepository = jest.spyOn(stubExistsDriver, "exists")
        const response = await sut.execute(request)

        expect(spyDriverRepository).toHaveBeenCalledTimes(1)
        expect(spyDriverRepository).toHaveBeenCalledWith(parseInt(request.id))
        expect(response).toEqual({ driverNotFounded: true })
    });


});