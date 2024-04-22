import { CreateRecord, RecordInProgress } from "@/domain/contracts/repos/record";
import { RegisterRecord } from "@/domain/contracts/useCases/record";
import { RegisterRecordCase } from "@/domain/useCases/record";
import { MockProxy, mock } from "jest-mock-extended";

describe("RegisterRecord UseCases", () => {
    let sut: RegisterRecord;
    let stubCreateRecordORM: MockProxy<CreateRecord>;
    let stubRecordInProgress: MockProxy<RecordInProgress>;
    beforeEach(() => {
        stubCreateRecordORM = mock<CreateRecord>();
        stubRecordInProgress = mock<RecordInProgress>();
        sut = new RegisterRecordCase(stubCreateRecordORM, stubRecordInProgress);
    });
    test("should create driver", async () => {
        stubRecordInProgress.findRecordInProgress.mockResolvedValueOnce(false)
        const request = { idMotorista: 1, idAutomovel: 1 }
        await sut.execute(request);
        const spy = jest.spyOn(stubCreateRecordORM, "create");

        expect(spy).toHaveBeenCalledTimes(1);
        expect(spy).toHaveBeenCalledWith(request);
    });

    test("should call function verify if exists record in progresss by idMotorista and idAutomovel", async () => {
        const request = { idMotorista: 1, idAutomovel: 1 }
        await sut.execute(request);
        const spy = jest.spyOn(stubRecordInProgress, "findRecordInProgress");

        expect(spy).toHaveBeenCalledTimes(1);
        expect(spy).toHaveBeenCalledWith(request);
    });

    test("should return recordInProgress equals true", async () => {
        stubRecordInProgress.findRecordInProgress.mockResolvedValueOnce(true)

        const request = { idMotorista: 1, idAutomovel: 1 }
        const response = await sut.execute(request);

        expect(response).toEqual({ recordInProgress: true });
    });

});
