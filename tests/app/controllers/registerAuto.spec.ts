import { RegisterAutoController } from "@/app/controllers/registerAuto";

describe("registerAuto Controller", () => {
  test("should return 200 if auto created successfully", () => {
    const sut = new RegisterAutoController();
    const request = {
      placa: "any_placa",
      cor: "any_cor",
      marca: "any_marca",
    };

    const response = sut.handle(request);

    expect(response.statusCode).toBe(200);
    expect(response.msg).toBe("Automóvel criado com sucesso");
  });
});
