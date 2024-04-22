import { RegisterVehicleController } from "@/app/controllers/";
import { RegisterVehicle } from "@/domain/contracts/useCases/vehicles";
import { ParamsError } from "@/app/helpers/excepetions";
import { HTTPBadRequest } from "@/app/helpers/http";
import { MockProxy, mock } from "jest-mock-extended";

describe("registerVehicle Controller", () => {
  let sut: RegisterVehicleController;
  let stubRegisterVehicle: MockProxy<RegisterVehicle>;

  beforeEach(() => {
    stubRegisterVehicle = mock<RegisterVehicle>();
    sut = new RegisterVehicleController(stubRegisterVehicle);
  });

  test("should return 400 if placa is not provided", async () => {
    const request = {
      cor: "any_cor",
      marca: "any_marca",
    };
    const response = await sut.handle(request);

    expect(response.statusCode).toBe(400);
    expect(response.data).toEqual(
      HTTPBadRequest(new ParamsError("\"placa\" is required")).data
    );
  });
  test("should return 400 if placa is not provided", async () => {
    const request = {
      placa: "any_placa",
      cor: "any_cor",
    };
    const response = await sut.handle(request);

    expect(response.statusCode).toBe(400);
    expect(response.data).toEqual(
      HTTPBadRequest(new ParamsError("\"marca\" is required")).data
    );
  });
  test("should return 400 if placa is not provided", async () => {
    const request = {
      placa: "any_placa",
      marca: "any_marca",
    };
    const response = await sut.handle(request);

    expect(response.statusCode).toBe(400);
    expect(response.data).toEqual(HTTPBadRequest(new ParamsError("\"cor\" is required")).data);
  });

  test("should return 500 if an internal error occurs", async () => {
    stubRegisterVehicle.execute.mockRejectedValueOnce(new Error("Internal Error"));
    const request = {
      placa: "any_placa",
      cor: "any_cor",
      marca: "any_marca",
    };
    const response = await sut.handle(request);

    expect(response.statusCode).toBe(500);
    expect(response.data).toEqual("Internal Error");
  });

  test("should return 200 if Vehicle created successfully", async () => {
    const request = {
      placa: "any_placa",
      cor: "any_cor",
      marca: "any_marca",
    };

    const response = await sut.handle(request);

    expect(response.statusCode).toBe(200);
    expect(response.data).toEqual("created successfully");
  });
});
