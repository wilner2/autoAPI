import { ParamIsMissing } from "@/helpers/excepetions";
import { HTTPBadRequest, Ok } from "@/helpers/http";

export class RegisterAutoController {
  handle(request: any) {
    const requiredParams = ["placa", "cor", "marca"];

    for (const field of requiredParams) {
      if (!request[field]) {
        return HTTPBadRequest(new ParamIsMissing(field));
      }
    }
    return Ok("Automóvel created successfully");
  }
}
