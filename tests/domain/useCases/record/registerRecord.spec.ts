import { CreateRecord } from "@/domain/contracts/repos/record";
import { RegisterRecord } from "@/domain/contracts/useCases/record";
import { RegisterRecordCase } from "@/domain/useCases/record";
import { MockProxy, mock } from "jest-mock-extended";

describe("RegisterRecord UseCases", () => {
    let sut: RegisterRecord;
    let stubCreateRecordORM: MockProxy<CreateRecord>;
    beforeEach(() => {
        stubCreateRecordORM = mock<CreateRecord>();
        sut = new RegisterRecordCase(stubCreateRecordORM);
    });
    test("should create driver", async () => {
        const request = { idMotorista: 1, idAutomovel: 1 }
        await sut.execute(request);
        const spy = jest.spyOn(stubCreateRecordORM, "create");

        expect(spy).toHaveBeenCalledTimes(1);
        expect(spy).toHaveBeenCalledWith(request);
    });
});
