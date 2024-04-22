import { RecoveryDriverController } from "@/app/controllers";
import { ParamsError, HTTPBadRequest } from "@/app/helpers/";
import { RecoveringDriver } from "@/domain/contracts/useCases/driver";
import { MockProxy, mock } from "jest-mock-extended";

describe('RecoveryDrier Controller', () => {

    let sut: RecoveryDriverController
    let stubRecoveringDriver: MockProxy<RecoveringDriver>
    beforeEach(() => {
        stubRecoveringDriver = mock<RecoveringDriver>()
        sut = new RecoveryDriverController(stubRecoveringDriver)
    })
    test('should return 400 if id is not provided', async () => {
        const request = {}

        const response = await sut.handle(request)

        expect(response.statusCode).toBe(400);
        expect(response.data).toEqual(
            HTTPBadRequest(new ParamsError("\"id\" is required")).data
        );
    });


    test("should return 200 if Drier recovery with successfully", async () => {
        stubRecoveringDriver.execute.mockResolvedValueOnce({ driverNotFounded: false });
        const request = { id: "1" }

        const response = await sut.handle(request);

        expect(response.statusCode).toBe(200);
        expect(response.data).toEqual("recovery successfully");
    });

    test("should return 500 if an internal error occurs", async () => {
        stubRecoveringDriver.execute.mockRejectedValueOnce(new Error("Internal Error"));
        const request = { id: "1" }
        const response = await sut.handle(request);

        expect(response.statusCode).toBe(500);
        expect(response.data).toEqual("Internal Error");
    });

    test('should return 404 if id of Drier not exists on resources', async () => {
        stubRecoveringDriver.execute.mockResolvedValueOnce({ driverNotFounded: true });

        const request = { id: "1" }
        const response = await sut.handle(request);

        expect(response.statusCode).toBe(404);
        expect(response.data).toEqual("ID not founded");
    });


});