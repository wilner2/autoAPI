import { RegisterAuto } from "@/contracts/useCases/registerAuto";
import { ParamsError } from "@/app/helpers/excepetions";
import {
  HTTPBadRequest,
  HTTPInternalServerError,
  Ok,
} from "@/app/helpers/http";
import Joi from "joi";
import { Controller } from "./controller";

export class RegisterAutoController implements Controller {
  constructor(private registerAuto: RegisterAuto) { }
  async handle(request: any) {
    try {
      const validation = this.validate(request)
      if (validation) {
        return HTTPBadRequest(new ParamsError(validation));
      }
      await this.registerAuto.execute(request);
      return Ok("created successfully");
    } catch (error) {
      return HTTPInternalServerError(error);
    }
  }

  validate(request: { placa: string }) {
    const schema = Joi.object({
      placa: Joi.string().required(),
      marca: Joi.string().required(),
      cor: Joi.string().required(),
    })
    const validation = schema.validate(request)
    if (validation) {
      return validation.error?.message
    }
  }
}
