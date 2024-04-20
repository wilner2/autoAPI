import { RegisterAuto } from "@/contracts/useCases/registerAuto";
import { ParamIsMissing } from "@/app/helpers/excepetions";
import {
  HTTPBadRequest,
  HTTPInternalServerError,
  Ok,
} from "@/app/helpers/http";

export class RegisterAutoController {
  constructor(private registerAuto: RegisterAuto) { }
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
