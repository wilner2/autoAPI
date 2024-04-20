import { RegisterAutoController } from "@/app/controllers/registerAuto";
import { RegisterAuto } from "@/contracts/registerAuto";
import { ParamIsMissing } from "@/helpers/excepetions";
import { HTTPBadRequest } from "@/helpers/http";
import { MockProxy, mock } from "jest-mock-extended";

describe("registerAuto Controller", () => {
  let sut: RegisterAutoController;
  let stubRegisterAuto: MockProxy<RegisterAuto>;

  beforeEach(() => {
    stubRegisterAuto = mock<RegisterAuto>();
    sut = new RegisterAutoController(stubRegisterAuto);
  });

  test("should return 400 if placa is not provided", async () => {
    const request = {
      cor: "any_cor",
      marca: "any_marca",
    };
    const response = await sut.handle(request);

    expect(response.statusCode).toBe(400);
    expect(response.msg).toEqual(
      HTTPBadRequest(new ParamIsMissing("placa")).msg
    );
  });
  test("should return 400 if placa is not provided", async () => {
    const request = {
      placa: "any_placa",
      cor: "any_cor",
    };
    const response = await sut.handle(request);

    expect(response.statusCode).toBe(400);
    expect(response.msg).toEqual(
      HTTPBadRequest(new ParamIsMissing("marca")).msg
    );
  });
  test("should return 400 if placa is not provided", async () => {
    const request = {
      placa: "any_placa",
      marca: "any_marca",
    };
    const response = await sut.handle(request);

    expect(response.statusCode).toBe(400);
    expect(response.msg).toEqual(HTTPBadRequest(new ParamIsMissing("cor")).msg);
  });

  test("should return 500 if an internal error occurs", async () => {
    stubRegisterAuto.execute.mockRejectedValueOnce(new Error("Internal Error"));
    const request = {
      placa: "any_placa",
      cor: "any_cor",
      marca: "any_marca",
    };
    const response = await sut.handle(request);

    expect(response.statusCode).toBe(500);
    expect(response.msg).toEqual("Internal Error");
  });

  test("should return 200 if auto created successfully", async () => {
    const request = {
      placa: "any_placa",
      cor: "any_cor",
      marca: "any_marca",
    };

    const response = await sut.handle(request);

    expect(response.statusCode).toBe(200);
    expect(response.msg).toEqual("created successfully");
  });
});
