import { FinishRecordController } from "@/app/controllers";
import { ParamsError, HTTPBadRequest } from "@/app/helpers/";
import { FinishingRecord } from "@/domain/contracts/useCases/record";
import { MockProxy, mock } from "jest-mock-extended";

describe('Finish Record Controller', () => {

    let sut: FinishRecordController
    let stubFinishingRecord: MockProxy<FinishingRecord>
    beforeEach(() => {
        stubFinishingRecord = mock<FinishingRecord>()
        sut = new FinishRecordController(stubFinishingRecord)
    })
    test('should return 400 if id is not provided', async () => {
        const request = {}

        const response = await sut.handle(request)

        expect(response.statusCode).toBe(400);
        expect(response.data).toEqual(
            HTTPBadRequest(new ParamsError("\"id\" is required")).data
        );
    });


    test("should return 200 if Record finished with successfully", async () => {
        const request = { id: "1" }

        const response = await sut.handle(request);

        expect(response.statusCode).toBe(200);
        expect(response.data).toEqual("records finished with successfully");
    });

    test("should return 500 if an internal error occurs", async () => {
        stubFinishingRecord.execute.mockRejectedValueOnce(new Error("Internal Error"));
        const request = { id: "1" }
        const response = await sut.handle(request);

        expect(response.statusCode).toBe(500);
        expect(response.data).toEqual("Internal Error");
    });



});