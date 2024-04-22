import { UpdateVehicleController } from "@/app/controllers/";
import { ParamsError } from "@/app/helpers/excepetions";
import { HTTPBadRequest } from "@/app/helpers/http";
import { UpdateVehicleContract } from "@/domain/contracts/useCases/vehicles";
import { MockProxy, mock } from "jest-mock-extended";

describe('UpdateVehicle Controller', () => {

    let sut: UpdateVehicleController
    let stubUpdatingVehicle: MockProxy<UpdateVehicleContract>
    beforeEach(() => {
        stubUpdatingVehicle = mock<UpdateVehicleContract>()
        sut = new UpdateVehicleController(stubUpdatingVehicle)
    })
    test('should return 400 if placa is not provided', async () => {
        const request = {
            id: 1,
            cor: "any_cor",
            marca: "any_marca",
            status: false
        }

        const response = await sut.handle(request)

        expect(response.statusCode).toBe(400);
        expect(response.data).toEqual(
            HTTPBadRequest(new ParamsError("\"placa\" is required")).data
        );
    });

    test('should return 400 if cor is not provided', async () => {
        const request = {
            id: 1,
            placa: "any_placa",
            marca: "any_marca",
            status: false
        }

        const response = await sut.handle(request)

        expect(response.statusCode).toBe(400);
        expect(response.data).toEqual(
            HTTPBadRequest(new ParamsError("\"cor\" is required")).data
        );
    });

    test('should return 400 if marca is not provided', async () => {
        const request = {
            id: 1,
            placa: "any_placa",
            cor: "any_cor",
            status: false
        }

        const response = await sut.handle(request)

        expect(response.statusCode).toBe(400);
        expect(response.data).toEqual(
            HTTPBadRequest(new ParamsError("\"marca\" is required")).data
        );
    });

    test('should return 400 if id is not provided', async () => {
        const request = {
            cor: "any_cor",
            placa: "any_placa",
            marca: "any_marca",
            status: false
        }

        const response = await sut.handle(request)

        expect(response.statusCode).toBe(400);
        expect(response.data).toEqual(
            HTTPBadRequest(new ParamsError("\"id\" is required")).data
        );
    });

    test('should return 400 if status is not provided', async () => {
        const request = {
            id: 1,
            cor: "any_cor",
            placa: "any_placa",
            marca: "any_marca",
        }

        const response = await sut.handle(request)

        expect(response.statusCode).toBe(400);
        expect(response.data).toEqual(
            HTTPBadRequest(new ParamsError("\"status\" is required")).data
        );
    });

    test("should return 200 if Vehicle updated successfully", async () => {
        stubUpdatingVehicle.execute.mockResolvedValueOnce({ vehicleNotFounded: false })
        const request = {
            id: 1,
            cor: "any_cor",
            placa: "any_placa",
            marca: "any_marca",
            status: true
        }

        const response = await sut.handle(request);

        expect(response.statusCode).toBe(200);
        expect(response.data).toEqual("created successfully");
    });

    test("should return 500 if an internal error occurs", async () => {
        stubUpdatingVehicle.execute.mockRejectedValueOnce(new Error("Internal Error"));
        const request = {
            id: 1,
            cor: "any_cor",
            placa: "any_placa",
            marca: "any_marca",
            status: true
        }
        const response = await sut.handle(request);

        expect(response.statusCode).toBe(500);
        expect(response.data).toEqual("Internal Error");
    });

    test('should return 404 if id of vehicle not exists on resources', async () => {
        stubUpdatingVehicle.execute.mockResolvedValueOnce({ vehicleNotFounded: true });

        const request = {
            id: 1,
            cor: "any_cor",
            placa: "any_placa",
            marca: "any_marca",
            status: true
        }
        const response = await sut.handle(request);

        expect(response.statusCode).toBe(404);
        expect(response.data).toEqual("ID not founded");
    });

});