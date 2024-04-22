import { RegisterDriverController } from "@/app/controllers";
import { RegisterDriver } from "@/domain/contracts/useCases/driver";
import { ParamsError, HTTPBadRequest } from "@/app/helpers";
import { MockProxy, mock } from "jest-mock-extended";

describe("RegisterDriver Controller", () => {
    let sut: RegisterDriverController;
    let stubRegisterDriver: MockProxy<RegisterDriver>;
    const request = { nome: 'any_name' }

    beforeEach(() => {
        stubRegisterDriver = mock<RegisterDriver>();
        sut = new RegisterDriverController(stubRegisterDriver);
    });

    test("should return 400 if nome is not provided", async () => {
        const response = await sut.handle({});

        expect(response.statusCode).toBe(400);
        expect(response.data).toEqual(
            HTTPBadRequest(new ParamsError("\"nome\" is required")).data
        );
    });

    test("should return 500 if an internal error occurs", async () => {
        stubRegisterDriver.execute.mockRejectedValueOnce(new Error("Internal Error"));
        const response = await sut.handle(request);

        expect(response.statusCode).toBe(500);
        expect(response.data).toEqual("Internal Error");
    });

    test("should return 200 if driver created successfully", async () => {

        const response = await sut.handle(request);

        expect(response.statusCode).toBe(200);
        expect(response.data).toEqual("created successfully");
    });
});
