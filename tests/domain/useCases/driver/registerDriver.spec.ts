import { CreateDriver } from "@/domain/contracts/repos/driver";
import { RegisterDriver } from "@/domain/contracts/useCases/driver";
import { RegisterDriverCase } from "@/domain/useCases/driver";
import { MockProxy, mock } from "jest-mock-extended";

describe("RegisterDriver UseCases", () => {
    let sut: RegisterDriver;
    let stubCreateDriverORM: MockProxy<CreateDriver>;
    beforeEach(() => {
        stubCreateDriverORM = mock<CreateDriver>();
        sut = new RegisterDriverCase(stubCreateDriverORM);
    });
    test("should create driver", async () => {
        const request = { nome: 'any_nome' }
        await sut.execute(request);
        const spy = jest.spyOn(stubCreateDriverORM, "create");

        expect(spy).toHaveBeenCalledTimes(1);
        expect(spy).toHaveBeenCalledWith(request);
    });
});
