import { HTTPBadRequest, HTTPInternalServerError, HTTPNotFound, Ok, ParamsError, ResourceNotFound } from "@/app/helpers";
import { Controller } from "../controller";
import { DeletingDriver } from "@/domain/contracts/useCases/driver";
import Joi from "joi";

export class DeleteDriverController implements Controller {
    constructor(private deleteDriver: DeletingDriver) { }
    async handle(request: any) {
        try {
            const validation = this.validate(request)
            if (validation) {
                return HTTPBadRequest(new ParamsError(validation));
            }
            const response = await this.deleteDriver.execute(request)
            if (response.driverNotFounded) {
                return HTTPNotFound(new ResourceNotFound("ID not founded"))
            }
            return Ok("Deleted successfully");
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
