import { ListRecordController } from "@/app/controllers";
import { HTTPBadRequest, ParamsError } from "@/app/helpers";
import { ListingRecord } from "@/domain/contracts/useCases/record";
import { MockProxy, mock } from "jest-mock-extended";
import MockDate from 'mockdate'

describe('List Record Controller', () => {

    let sut: ListRecordController
    let stubListingRecord: MockProxy<ListingRecord>
    let request = {
        offset: "1",
        limit: "10",
    }
    beforeEach(() => {
        stubListingRecord = mock<ListingRecord>()
        sut = new ListRecordController(stubListingRecord)

    })
    afterAll(() => {
        MockDate.reset()
    })
    beforeAll(() => {
        MockDate.set(new Date().toString())
    })


    test("should return 200 if driver delete successfully", async () => {
        stubListingRecord.execute.mockResolvedValueOnce([
            {
                id: 1,
                marca: "any_marca",
                placa: "any_placa",
                cor: "any_cor",
                motorista: "any_motorista",
                status: true,
                inicio: new Date(),
                fim: new Date(),
                desc: "any_desc"
            }
        ])
        const response = await sut.handle(request)

        expect(response.statusCode).toBe(200)
        expect(response.data).toEqual([
            {
                id: 1,
                marca: "any_marca",
                placa: "any_placa",
                cor: "any_cor",
                motorista: "any_motorista",
                status: true,
                inicio: new Date(),
                fim: new Date(),
                desc: "any_desc"
            }
        ])

    });

    test("should return 400 if driver delete successfully", async () => {
        const request = {
            offset: 2,
            limit: "10",
        }

        const response = await sut.handle(request)

        expect(response.statusCode).toBe(400)
        expect(response.data).toEqual(HTTPBadRequest(new ParamsError("\"offset\" must be a string")).data)


    });

    test("should return 500 if an internal error occurs", async () => {
        stubListingRecord.execute.mockRejectedValueOnce(new Error("Internal Error"));
        const response = await sut.handle(request);

        expect(response.statusCode).toBe(500);
        expect(response.data).toEqual("Internal Error");
    });



});