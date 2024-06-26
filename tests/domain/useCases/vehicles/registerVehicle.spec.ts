import { CreateVehicle } from "@/domain/contracts/repos/vehicle";
import { RegisterVehicle } from "@/domain/contracts/useCases/vehicles";
import { RegisterVehicleCase } from "@/domain/useCases/vehicles/registerVehicle";
import { MockProxy, mock } from "jest-mock-extended";

describe("RegisterVehicle UseCases", () => {
  let sut: RegisterVehicle;
  let stubCreateVehicleORM: MockProxy<CreateVehicle>;
  beforeEach(() => {
    stubCreateVehicleORM = mock<CreateVehicle>();
    sut = new RegisterVehicleCase(stubCreateVehicleORM);
  });
  test("should create Vehicle", async () => {
    const request = { placa: 'any_placa', cor: 'any_cor', marca: 'any_marca' }
    await sut.execute(request);
    const spy = jest.spyOn(stubCreateVehicleORM, "create");

    expect(spy).toHaveBeenCalledTimes(1);
    expect(spy).toHaveBeenCalledWith(request);
  });
});
