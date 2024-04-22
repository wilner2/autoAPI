import { ListDriverController } from "@/app/controllers";
import { ListingDriver } from "@/domain/contracts/useCases/driver";
import { MockProxy, mock } from "jest-mock-extended";
import MockDate from 'mockdate'

describe('List Driver Controller', () => {

    let sut: ListDriverController
    let stubListingDriver: MockProxy<ListingDriver>
    let request = {
        offset: "1",
        limit: "10",
        nome: "any_nome",
    }
    beforeEach(() => {
        stubListingDriver = mock<ListingDriver>()
        sut = new ListDriverController(stubListingDriver)

    })
    afterAll(() => {
        MockDate.reset()
    })
    beforeAll(() => {
        MockDate.set(new Date().toString())
    })


    test("should return 200 if driver delete successfully", async () => {
        stubListingDriver.execute.mockResolvedValueOnce([{
            id: 1,
            created_at: new Date(),
            status: true,
            nome: "any_nome",
        }])
        const response = await sut.handle(request)

        expect(response.statusCode).toBe(200)
        expect(response.data).toEqual([{
            id: 1,
            created_at: new Date(),
            status: true,
            nome: "any_nome",
        }])

    });

    test("should return 500 if an internal error occurs", async () => {
        stubListingDriver.execute.mockRejectedValueOnce(new Error("Internal Error"));
        const response = await sut.handle(request);

        expect(response.statusCode).toBe(500);
        expect(response.data).toEqual("Internal Error");
    });



});