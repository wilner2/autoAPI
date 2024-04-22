import { UpdateDriverController } from "@/app/controllers/";
import { ParamsError } from "@/app/helpers/excepetions";
import { HTTPBadRequest } from "@/app/helpers/http";
import { UpdatingDriver } from "@/domain/contracts/useCases/driver";
import { MockProxy, mock } from "jest-mock-extended";

describe('Update Controller', () => {

    let sut: UpdateDriverController
    let stubUpdatingDriver: MockProxy<UpdatingDriver>
    beforeEach(() => {
        stubUpdatingDriver = mock<UpdatingDriver>()
        sut = new UpdateDriverController(stubUpdatingDriver)
    })
    test('should return 400 if id is not provided', async () => {
        const request = {}

        const response = await sut.handle(request)

        expect(response.statusCode).toBe(400);
        expect(response.data).toEqual(
            HTTPBadRequest(new ParamsError("\"id\" is required")).data
        );
    });


    test("should return 200 if driver update successfully", async () => {
        stubUpdatingDriver.execute.mockResolvedValueOnce({ driverNotFounded: false });
        const request = { id: "1" }

        const response = await sut.handle(request);

        expect(response.statusCode).toBe(200);
        expect(response.data).toEqual("updated successfully");
    });

    test("should return 500 if an internal error occurs", async () => {
        stubUpdatingDriver.execute.mockRejectedValueOnce(new Error("Internal Error"));
        const request = { id: "1" }
        const response = await sut.handle(request);

        expect(response.statusCode).toBe(500);
        expect(response.data).toEqual("Internal Error");
    });

    test('should return 404 if id of driver not exists on resources', async () => {
        stubUpdatingDriver.execute.mockResolvedValueOnce({ driverNotFounded: true });

        const request = { id: "1" }
        const response = await sut.handle(request);

        expect(response.statusCode).toBe(404);
        expect(response.data).toEqual("ID not founded");
    });


});