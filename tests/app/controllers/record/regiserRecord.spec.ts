import { RegisterRecordController } from "@/app/controllers";
import { RegisterRecord } from "@/domain/contracts/useCases/record";
import { ParamsError } from "@/app/helpers/excepetions";
import { HTTPBadRequest } from "@/app/helpers/http";
import { MockProxy, mock } from "jest-mock-extended";

describe("RegisterRecord Controller", () => {
    let sut: RegisterRecordController;
    let stubRegisterRecord: MockProxy<RegisterRecord>;

    beforeEach(() => {
        stubRegisterRecord = mock<RegisterRecord>();
        sut = new RegisterRecordController(stubRegisterRecord);
    });

    test("should return 400 if idAutomovel is not provided", async () => {
        const request = { idMotorista: 1, desc: "any_desc" };
        const response = await sut.handle(request);

        expect(response.statusCode).toBe(400);
        expect(response.data).toEqual(
            HTTPBadRequest(new ParamsError("\"idAutomovel\" is required")).data
        );
    });
    test("should return 400 if idMotorista is not provided", async () => {
        const request = { idAutomovel: 1, desc: "any_desc" };
        const response = await sut.handle(request);

        expect(response.statusCode).toBe(400);
        expect(response.data).toEqual(
            HTTPBadRequest(new ParamsError("\"idMotorista\" is required")).data
        );
    });
    test("should return 400 if desc is not provided", async () => {
        const request = { idAutomovel: 1, idMotorista: 1 };
        const response = await sut.handle(request);

        expect(response.statusCode).toBe(400);
        expect(response.data).toEqual(
            HTTPBadRequest(new ParamsError("\"desc\" is required")).data
        );
    });

    test("should return 500 if an internal error occurs", async () => {
        stubRegisterRecord.execute.mockRejectedValueOnce(new Error("Internal Error"));
        const request = { idAutomovel: 1, idMotorista: 1, desc: "any_desc" };

        const response = await sut.handle(request);

        expect(response.statusCode).toBe(500);
        expect(response.data).toEqual("Internal Error");
    });

    test("should return 200 if record created successfully", async () => {
        stubRegisterRecord.execute.mockResolvedValueOnce({ recordInProgress: false })
        const request = { idAutomovel: 1, idMotorista: 1, desc: "any_desc" };

        const response = await sut.handle(request);

        expect(response.statusCode).toBe(200);
        expect(response.data).toEqual("created successfully");
    });

    test("should return 409 if record be in progress", async () => {
        stubRegisterRecord.execute.mockResolvedValueOnce({ recordInProgress: true })
        const request = { idAutomovel: 1, idMotorista: 1, desc: "any_desc" };

        const response = await sut.handle(request);

        expect(response.statusCode).toBe(409);
        expect(response.data).toEqual("Vehicle or Driver with record in progress");
    });
});
