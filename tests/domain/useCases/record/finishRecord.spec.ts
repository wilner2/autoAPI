import { FinishRecord } from "@/domain/contracts/repos/record";
import { finishRecordCase } from "@/domain/useCases/record";
import { MockProxy, mock } from "jest-mock-extended";
import MockDate from 'mockdate'

describe("Finish Record UseCases", () => {
    let sut: finishRecordCase;
    let stubFinishRecord: MockProxy<FinishRecord>;
    const request = { id: 1 }
    beforeEach(() => {
        stubFinishRecord = mock<FinishRecord>();
        sut = new finishRecordCase(stubFinishRecord);
    });

    afterAll(() => {
        MockDate.reset()
    })
    beforeAll(async () => {
        MockDate.set(new Date().toString())
    })

    test("should call update function with correct params", async () => {
        const spyFinishrecord = jest.spyOn(stubFinishRecord, 'update')
        await sut.execute(request);

        expect(spyFinishrecord).toHaveBeenCalledTimes(1)
        expect(spyFinishrecord).toHaveBeenCalledWith({
            ...request, inProgress: false, fim: new Date()
        })
    });

});
