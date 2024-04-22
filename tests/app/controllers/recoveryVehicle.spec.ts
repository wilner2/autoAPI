import { RecoveryVehicleController } from "@/app/controllers/recoveryVehicle";
import { ParamsError } from "@/app/helpers/excepetions";
import { HTTPBadRequest } from "@/app/helpers/http";
import { RecoveringVehicle } from "@/contracts/useCases/recoveryVehicle";
import { MockProxy, mock } from "jest-mock-extended";

describe('RecoveryVehicle Controller', () => {

    let sut: RecoveryVehicleController
    let stubRecoveringVehicle: MockProxy<RecoveringVehicle>
    beforeEach(() => {
        stubRecoveringVehicle = mock<RecoveringVehicle>()
        sut = new RecoveryVehicleController(stubRecoveringVehicle)
    })
    test('should return 400 if id is not provided', async () => {
        const request = {}

        const response = await sut.handle(request)

        expect(response.statusCode).toBe(400);
        expect(response.data).toEqual(
            HTTPBadRequest(new ParamsError("\"id\" is required")).data
        );
    });


    test("should return 200 if Vehicle recovery with successfully", async () => {
        stubRecoveringVehicle.execute.mockResolvedValueOnce({ vehicleNotFounded: false });
        const request = { id: "1" }

        const response = await sut.handle(request);

        expect(response.statusCode).toBe(200);
        expect(response.data).toEqual("recovery successfully");
    });

    test("should return 500 if an internal error occurs", async () => {
        stubRecoveringVehicle.execute.mockRejectedValueOnce(new Error("Internal Error"));
        const request = { id: "1" }
        const response = await sut.handle(request);

        expect(response.statusCode).toBe(500);
        expect(response.data).toEqual("Internal Error");
    });

    test('should return 404 if id of vehicle not exists on resources', async () => {
        stubRecoveringVehicle.execute.mockResolvedValueOnce({ vehicleNotFounded: true });

        const request = { id: "1" }
        const response = await sut.handle(request);

        expect(response.statusCode).toBe(404);
        expect(response.data).toEqual("ID not founded");
    });


});