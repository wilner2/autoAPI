import { RegisterAuto } from "@/contracts/registerAuto";
import { ParamIsMissing } from "@/helpers/excepetions";
import { HTTPBadRequest, HTTPInternalServerError, Ok } from "@/helpers/http";

export class RegisterAutoController {
  constructor(private registerAuto: RegisterAuto) {}
  async handle(request: any) {
    try {
      const requiredParams = ["placa", "cor", "marca"];

      for (const field of requiredParams) {
        if (!request[field]) {
          return HTTPBadRequest(new ParamIsMissing(field));
        }
      }
      await this.registerAuto.execute(request);
      return Ok("created successfully");
    } catch (error) {
      return HTTPInternalServerError(error);
    }
  }
}
