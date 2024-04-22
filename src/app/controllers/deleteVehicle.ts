import { ParamsError } from "@/app/helpers/excepetions";
import {
    HTTPBadRequest,
    HTTPInternalServerError,
    Ok,
} from "@/app/helpers/http";
import Joi from "joi";
import { Controller } from "./controller";
import { DeleteVehicle } from "@/contracts/useCases/deleteVehicle";

export class DeleteVehicleController implements Controller {
    constructor(private deleteVehicle: DeleteVehicle) { }
    async handle(request: any) {
        try {
            const validation = this.validate(request)
            if (validation) {
                return HTTPBadRequest(new ParamsError(validation));
            }
            await this.deleteVehicle.execute(request);
            return Ok("Deleted successfully");
        } catch (error) {
            return HTTPInternalServerError(error);
        }
    }

    validate(request: { placa: string }) {
        const schema = Joi.object({
            id: Joi.string().required(),
        })
        const validation = schema.validate(request)
        if (validation) {
            return validation.error?.message
        }
    }
}
