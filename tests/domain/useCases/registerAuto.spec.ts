import { CreateAuto } from "@/contracts/repos/createAuto";
import { RegisterAuto } from "@/contracts/useCases/registerAuto";
import { RegisterAutoCase } from "@/domain/useCases/registerAuto";
import { MockProxy, mock } from "jest-mock-extended";

describe("RegisterAuto UseCases", () => {
  let sut: RegisterAuto;
  let stubCreateAutoORM: MockProxy<CreateAuto>;
  beforeEach(() => {
    stubCreateAutoORM = mock<CreateAuto>();
    sut = new RegisterAutoCase(stubCreateAutoORM);
  });
  test("should create auto", async () => {
    const request = {
      placa: "any_placa",
      cor: "any_cor",
      marca: "any_marca",
    };
    await sut.execute(request);
    const spy = jest.spyOn(stubCreateAutoORM, "create");

    expect(spy).toHaveBeenCalledTimes(1);
    expect(spy).toHaveBeenCalledWith(request);
  });
});
