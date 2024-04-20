import { ParamIsMissing } from "@/helpers/excepetions";
import { HTTPBadRequest } from "@/helpers/http";

export class RegisterAutoController {
  handle(request: any) {
    const requiredParams = ["placa", "cor", "marca"];

    for (const field of requiredParams) {
      if (!request[field]) {
        return HTTPBadRequest(new ParamIsMissing(field));
      }
    }
    return { statusCode: 200, msg: "Automóvel created successfully" };
  }
}
