import { ListDriver } from "@/domain/contracts/repos/driver";
import { ListDriverCase } from "@/domain/useCases/driver";
import { MockProxy, mock } from "jest-mock-extended";
import MockDate from 'mockdate'

describe('list Driver UseCase', () => {

    let sut: ListDriverCase
    let stubListDriver: MockProxy<ListDriver>
    const request = {
        offset: "1",
        limit: "10",
        nome: "any_nome",
    }

    beforeEach(() => {
        stubListDriver = mock<ListDriver>()
        sut = new ListDriverCase(stubListDriver)
    })
    afterAll(() => {
        MockDate.reset()
    })
    beforeAll(() => {
        MockDate.set(new Date().toString())
    })
    test('should return a list of drivers with correct params', async () => {
        stubListDriver.list.mockResolvedValueOnce([{
            id: 1,
            created_at: new Date(),
            status: true,
            nome: "any_nome",
        }])
        const SpyListDrivers = jest.spyOn(stubListDriver, "list")

        const response = await sut.execute(request)

        expect(response).toEqual([{
            id: 1,
            created_at: new Date(),
            status: true,
            nome: "any_nome",
        }])
        expect(SpyListDrivers).toHaveBeenCalledWith({ ...request, limit: parseInt(request.limit), offset: parseInt(request.offset) })
        expect(SpyListDrivers).toHaveBeenCalledTimes(1)

    });
});