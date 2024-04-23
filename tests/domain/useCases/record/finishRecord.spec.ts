import { FinishRecord } from "@/domain/contracts/repos/record";
import { finishRecordCase } from "@/domain/useCases/record";
import { MockProxy, mock } from "jest-mock-extended";

describe("Finish Record UseCases", () => {
    let sut: finishRecordCase;
    let stubFinishRecord: MockProxy<FinishRecord>;
    const request = { id: 1 }
    beforeEach(() => {
        stubFinishRecord = mock<FinishRecord>();
        sut = new finishRecordCase(stubFinishRecord);
    });


    test("should call update fnction with correct params", async () => {
        const spyFinishrecord = jest.spyOn(stubFinishRecord, 'update')
        await sut.execute(request);

        expect(spyFinishrecord).toHaveBeenCalledTimes(1)
        expect(spyFinishrecord).toHaveBeenCalledWith({ ...request, inProgress: false })
    });

});
