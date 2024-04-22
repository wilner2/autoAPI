import { RegisterDriver } from "@/domain/contracts/useCases/driver";
import { HTTPBadRequest, HTTPInternalServerError, Ok, ParamsError } from "@/app/helpers";
import { Controller } from "../controller";

import Joi from "joi";

export class RegisterDriverController implements Controller {
  constructor(private registerDriver: RegisterDriver) { }
  async handle(request: any) {
    try {
      const validation = this.validate(request)
      if (validation) {
        return HTTPBadRequest(new ParamsError(validation));
      }
      await this.registerDriver.execute(request);
      return Ok("created successfully");
    } catch (error) {
      return HTTPInternalServerError(error);
    }
  }

  validate(request: any): string | undefined {
    const schema = Joi.object({
      nome: Joi.string().required(),

    })
    const validation = schema.validate(request)
    if (validation) {
      return validation.error?.message
    }
  }
}
