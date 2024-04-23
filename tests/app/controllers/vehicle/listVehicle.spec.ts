import { ListVehiclesController } from "@/app/controllers/vehicles/listVehicles";
import { ListingVehicle } from "@/domain/contracts/useCases/vehicles";
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
            created_at: new Date(),
            status: true,
            placa: "any_placa",
            cor: "any_cor",
            marca: "any_marca",
        }])
        const response = await sut.handle(request)

        expect(response.statusCode).toBe(200)
        expect(response.data).toEqual([{
            id: 1,
            created_at: new Date(),
            status: true,
            placa: "any_placa",
            cor: "any_cor",
            marca: "any_marca",
        }])

    });
    test("should return 400 if a fields is not provided corretly", async () => {
        jest.spyOn(sut, 'validate').mockReturnValueOnce('any_message')
        const response = await sut.handle(request);

        expect(response.statusCode).toBe(400);
        expect(response.data).toEqual('any_message');
    });
    test("should return undefined on validate fields", async () => {
        const response = sut.validate(request);

        expect(response).toEqual(undefined);
    });

    test("should return a message on validate fields  ", async () => {
        const response = sut.validate(2123);

        expect(response).toEqual("\"value\" must be of type object");
    });

    test("should return 500 if an internal error occurs", async () => {
        stubListingVehicle.execute.mockRejectedValueOnce(new Error("Internal Error"));
        const response = await sut.handle(request);

        expect(response.statusCode).toBe(500);
        expect(response.data).toEqual("Internal Error");
    });



});