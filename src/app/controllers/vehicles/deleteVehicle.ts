import { HTTPBadRequest, HTTPInternalServerError, HTTPNotFound, Ok, ParamsError, ResourceNotFound } from "@/app/helpers";

import Joi from "joi";
import { Controller } from "../controller";
import { DeletingVehicle } from "@/domain/contracts/useCases/vehicles/deleteVehicle";

export class DeleteVehicleController implements Controller {
    constructor(private deleteVehicle: DeletingVehicle) { }
    async handle(request: any) {
        try {
            const validation = this.validate(request)
            if (validation) {
                return HTTPBadRequest(new ParamsError(validation));
            }
            const response = await this.deleteVehicle.execute(request)
            if (response.vehicleNotFounded) {
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
