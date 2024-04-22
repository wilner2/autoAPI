import { HTTPBadRequest, HTTPInternalServerError, HTTPNotFound, HttpResponse, Ok, ParamsError, ResourceNotFound } from "@/app/helpers";
import { UpdateDriverContract } from "@/domain/contracts/useCases/driver";
import { Controller } from "../controller";

import Joi from "joi"

export class UpdateDriverController implements Controller {
    constructor(private updateDriver: UpdateDriverContract) { }

    async handle(request: any): Promise<HttpResponse> {
        try {
            const validation = this.validate(request)
            if (validation) {
                return HTTPBadRequest(new ParamsError(validation));
            }

            const response = await this.updateDriver.execute(request)
            if (response.driverNotFounded) {
                return HTTPNotFound(new ResourceNotFound("ID not founded"))
            }
            return Ok("created successfully");
        } catch (error) {
            return HTTPInternalServerError(error)
        }
    }
    validate(request: any): string | undefined {
        const schema = Joi.object({
            id: Joi.number().required(),
            nome: Joi.string(),
        })
        const validation = schema.validate(request)
        if (validation) {
            return validation.error?.message
        }
    }
}

