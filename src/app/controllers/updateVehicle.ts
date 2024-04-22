import Joi from "joi"
import { ParamsError, ResourceNotFound } from "@/app/helpers/excepetions";
import { HTTPBadRequest, HTTPInternalServerError, HTTPNotFound, HttpResponse, Ok } from "@/app/helpers/http";
import { UpdateVehicleContract } from "@/contracts/useCases/updateVehicle";
import { Controller } from "./controller";

export class UpdateVehicleController implements Controller {
    constructor(private updateVehicleCase: UpdateVehicleContract) { }

    async handle(request: any): Promise<HttpResponse> {
        try {
            const validation = this.validate(request)
            if (validation) {
                return HTTPBadRequest(new ParamsError(validation));
            }

            const response = await this.updateVehicleCase.execute(request)
            if (response.vehicleNotFounded) {
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
            placa: Joi.string().required(),
            marca: Joi.string().required(),
            cor: Joi.string().required(),
            status: Joi.boolean().required()

        })
        const validation = schema.validate(request)
        if (validation) {
            return validation.error?.message
        }
    }
}

