import { RegisterAutoController } from "@/app/controllers/registerAuto";
import { ParamIsMissing } from "@/helpers/excepetions";
import { HTTPBadRequest } from "@/helpers/http";

describe("registerAuto Controller", () => {
  let sut: RegisterAutoController;
  beforeEach(() => {
    sut = new RegisterAutoController();
  });

  test("should return 400 if placa is not provided", () => {
    const request = {
      cor: "any_cor",
      marca: "any_marca",
    };
    const response = sut.handle(request);

    expect(response.statusCode).toBe(400);
    expect(response.msg).toEqual(
      HTTPBadRequest(new ParamIsMissing("placa")).msg
    );
  });

  test("should return 200 if auto created successfully", () => {
    const request = {
      placa: "any_placa",
      cor: "any_cor",
      marca: "any_marca",
    };

    const response = sut.handle(request);

    expect(response.statusCode).toBe(200);
    expect(response.msg).toEqual("Automóvel created successfully");
  });
});
