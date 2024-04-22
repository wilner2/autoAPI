import { ListVehiclesController } from "@/app/controllers/listVehicles";
import { ListingVehicle } from "@/contracts/useCases/listVehicles";
import { MockProxy, mock } from "jest-mock-extended";
import MockDate from 'mockdate'

describe('ListVehicles Controller', () => {

    let sut: ListVehiclesController
    let stubListingVehicle: MockProxy<ListingVehicle>
    let request = {
        offset: "1",
        limit: "10",
        marca: "any_marca",
        cor: "any_cor"
    }
    beforeEach(() => {
        stubListingVehicle = mock<ListingVehicle>()
        sut = new ListVehiclesController(stubListingVehicle)

    })
    afterAll(() => {
        MockDate.reset()
    })
    beforeAll(() => {
        MockDate.set(new Date().toString())
    })


    test("should return 200 if Vehicle delete successfully", async () => {
        stubListingVehicle.execute.mockResolvedValueOnce([{
            id: 1,
            create_at: new Date(),
            status: true,
            placa: "any_placa",
            cor: "any_cor",
            marca: "any_marca",
        }])
        const response = await sut.handle(request)

        expect(response.statusCode).toBe(200)
        expect(response.data).toEqual([{
            id: 1,
            create_at: new Date(),
            status: true,
            placa: "any_placa",
            cor: "any_cor",
            marca: "any_marca",
        }])

    });

    test("should return 500 if an internal error occurs", async () => {
        stubListingVehicle.execute.mockRejectedValueOnce(new Error("Internal Error"));
        const response = await sut.handle(request);

        expect(response.statusCode).toBe(500);
        expect(response.data).toEqual("Internal Error");
    });



});