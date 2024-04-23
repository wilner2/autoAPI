import { CreateRecord, RecordInProgress } from "@/domain/contracts/repos/record";
import { RegisterRecordCase } from "@/domain/useCases/record";
import { MockProxy, mock } from "jest-mock-extended";

describe("RegisterRecord UseCases", () => {
    let sut: RegisterRecordCase;
    let stubCreateRecordORM: MockProxy<CreateRecord>;
    let stubRecordInProgress: MockProxy<RecordInProgress>;
    const request = { idMotorista: 1, idAutomovel: 1, desc: "any_desc" }
    beforeEach(() => {
        stubCreateRecordORM = mock<CreateRecord>();
        stubRecordInProgress = mock<RecordInProgress>();
        sut = new RegisterRecordCase(stubCreateRecordORM, stubRecordInProgress);
    });
    test("should create driver", async () => {
        stubRecordInProgress.findRecordInProgress.mockResolvedValueOnce(false)
        await sut.execute(request);
        const spy = jest.spyOn(stubCreateRecordORM, "create");

        expect(spy).toHaveBeenCalledTimes(1);
        expect(spy).toHaveBeenCalledWith(request);
    });

    test("should call function verify if exists record in progresss by idMotorista and idAutomovel", async () => {
        await sut.execute(request);
        const spy = jest.spyOn(stubRecordInProgress, "findRecordInProgress");

        expect(spy).toHaveBeenCalledTimes(1);
        expect(spy).toHaveBeenCalledWith(request);
    });

    test("should return recordInProgress equals true", async () => {
        stubRecordInProgress.findRecordInProgress.mockResolvedValueOnce(true)

        const response = await sut.execute(request);

        expect(response).toEqual({ recordInProgress: true });
    });

});
