import { ListRecord } from "@/domain/contracts/repos/record";
import { ListRecordCase } from "@/domain/useCases/record";
import { MockProxy, mock } from "jest-mock-extended";
import MockDate from 'mockdate'

describe('list Record UseCase', () => {

    let sut: ListRecordCase
    let stubListRecord: MockProxy<ListRecord>
    const request = {

        cor: "any_cor",
        desc: "any_desc",
        fim: new Date().toLocaleString(),
        inicio: new Date().toLocaleString(),
        marca: "any_marca",
        motorista: "any_motorista",
        placa: "any_placa",
    }

    beforeEach(() => {
        stubListRecord = mock<ListRecord>()
        sut = new ListRecordCase(stubListRecord)
    })
    afterAll(() => {
        MockDate.reset()
    })
    beforeAll(() => {
        MockDate.set(new Date().toString())
    })
    test('should return a list of records with correct params', async () => {
        stubListRecord.list.mockResolvedValueOnce([{
            id: 1,
            marca: "any_marca",
            placa: "any_placa",
            cor: "any_cor",
            motorista: "any_motorista",
            status: true,
            inicio: new Date(),
            fim: new Date(),
            desc: "any_desc"
        }])
        const SpyListRecords = jest.spyOn(stubListRecord, "list")

        const response = await sut.execute(request)

        expect(response).toEqual([{
            id: 1,
            marca: "any_marca",
            placa: "any_placa",
            cor: "any_cor",
            motorista: "any_motorista",
            status: true,
            inicio: new Date(),
            fim: new Date(),
            desc: "any_desc"
        }])
        expect(SpyListRecords).toHaveBeenCalledWith({ ...request, limit: 10, offset: 0 })
        expect(SpyListRecords).toHaveBeenCalledTimes(1)

    });


});