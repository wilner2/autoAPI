import { HTTPBadRequest, HTTPInternalServerError, HTTPNotFound, Ok, ParamsError, ResourceNotFound } from "@/app/helpers";
import { RecoveringDriver } from "@/domain/contracts/useCases/driver";
import { Controller } from "../controller";
import Joi from "joi";

export class RecoveryDriverController implements Controller {
    constructor(private recoverydriver: RecoveringDriver) { }
    async handle(request: any) {
        try {
            const validation = this.validate(request)
            if (validation) {
                return HTTPBadRequest(new ParamsError(validation));
            }
            const response = await this.recoverydriver.execute(request)
            if (response.driverNotFounded) {
                return HTTPNotFound(new ResourceNotFound("ID not founded"))
            }
            return Ok("recovery successfully");
        } catch (error) {
            return HTTPInternalServerError(error);
        }
    }

    validate(request: any): string | undefined {
        const schema = Joi.object({
            id: Joi.number().required(),
        })
        const validation = schema.validate(request)
        if (validation) {
            return validation.error?.message
        }
    }
}
