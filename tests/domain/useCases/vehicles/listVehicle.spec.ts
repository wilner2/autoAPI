import { ListVehicle } from "@/domain/contracts/repos/vehicle";
import { ListVehicleCase } from "@/domain/useCases/vehicles/listVehicle";
import { MockProxy, mock } from "jest-mock-extended";
import MockDate from 'mockdate'

describe('list Vehicle UseCase', () => {

    let sut: ListVehicleCase
    let stubListVehicle: MockProxy<ListVehicle>
    const request = {

        marca: "any_marca",
        cor: "any_cor"
    }

    beforeEach(() => {
        stubListVehicle = mock<ListVehicle>()
        sut = new ListVehicleCase(stubListVehicle)
    })
    afterAll(() => {
        MockDate.reset()
    })
    beforeAll(() => {
        MockDate.set(new Date().toString())
    })
    test('should return a list of vehicles with correct params', async () => {
        stubListVehicle.list.mockResolvedValueOnce([{
            id: 1,
            created_at: new Date(),
            status: true,
            placa: "any_placa",
            cor: "any_cor",
            marca: "any_marca",
        }])
        const SpyListVehicles = jest.spyOn(stubListVehicle, "list")

        const response = await sut.execute(request)

        expect(response).toEqual([{
            id: 1,
            created_at: new Date(),
            status: true,
            placa: "any_placa",
            cor: "any_cor",
            marca: "any_marca",
        }])
        expect(SpyListVehicles).toHaveBeenCalledWith({ ...request, limit: 10, offset: 0 })

        expect(SpyListVehicles).toHaveBeenCalledTimes(1)

    });
});