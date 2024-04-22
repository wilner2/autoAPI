import { HTTPBadRequest, HTTPInternalServerError, HTTPNotFound, Ok, ParamsError, ResourceNotFound } from "@/app/helpers";
import Joi from "joi";
import { RecoveringVehicle } from "@/domain/contracts/useCases/vehicles";
import { Controller } from "../controller";

export class RecoveryVehicleController implements Controller {
    constructor(private recoveryVehicle: RecoveringVehicle) { }
    async handle(request: any) {
        try {
            const validation = this.validate(request)
            if (validation) {
                return HTTPBadRequest(new ParamsError(validation));
            }
            const response = await this.recoveryVehicle.execute(request)
            if (response.vehicleNotFounded) {
                return HTTPNotFound(new ResourceNotFound("ID not founded"))
            }
            return Ok("recovery successfully");
        } catch (error) {
            return HTTPInternalServerError(error);
        }
    }

    validate(request: { placa: string }) {
        const schema = Joi.object({
            id: Joi.number().required(),
        })
        const validation = schema.validate(request)
        if (validation) {
            return validation.error?.message
        }
    }
}
