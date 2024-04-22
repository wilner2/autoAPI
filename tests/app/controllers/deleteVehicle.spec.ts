import { DeleteVehicleController } from "@/app/controllers/deleteVehicle";
import { ParamsError } from "@/app/helpers/excepetions";
import { HTTPBadRequest } from "@/app/helpers/http";
import { DeleteVehicle } from "@/contracts/useCases/deleteVehicle";
import { MockProxy, mock } from "jest-mock-extended";

describe('DeleteVehicle Controller', () => {

    let sut: DeleteVehicleController
    let stubDeletingVehicle: MockProxy<DeleteVehicle>
    beforeEach(() => {
        stubDeletingVehicle = mock<DeleteVehicle>()
        sut = new DeleteVehicleController(stubDeletingVehicle)
    })
    test('should return 400 if id is not provided', async () => {
        const request = {}

        const response = await sut.handle(request)

        expect(response.statusCode).toBe(400);
        expect(response.data).toEqual(
            HTTPBadRequest(new ParamsError("\"id\" is required")).data
        );
    });


    test("should return 200 if Vehicle delete successfully", async () => {
        const request = { id: "1" }

        const response = await sut.handle(request);

        expect(response.statusCode).toBe(200);
        expect(response.data).toEqual("Deleted successfully");
    });

    test("should return 500 if an internal error occurs", async () => {
        stubDeletingVehicle.execute.mockRejectedValueOnce(new Error("Internal Error"));
        const request = { id: "1" }
        const response = await sut.handle(request);

        expect(response.statusCode).toBe(500);
        expect(response.data).toEqual("Internal Error");
    });


});