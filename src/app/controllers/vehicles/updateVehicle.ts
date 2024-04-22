import Joi from "joi"
import { HTTPBadRequest, HTTPInternalServerError, HTTPNotFound, HttpResponse, Ok, ParamsError, ResourceNotFound } from "@/app/helpers";
import { UpdateVehicleContract } from "@/domain/contracts/useCases/vehicles";
import { Controller } from "../controller";

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

