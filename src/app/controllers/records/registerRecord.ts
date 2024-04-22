import { RegisterRecord } from "@/domain/contracts/useCases/record";
import { HTTPBadRequest, HTTPInternalServerError, Ok, ParamsError } from "@/app/helpers";
import { Controller } from "../controller";

import Joi from "joi";

export class RegisterRecordController implements Controller {
    constructor(private registerRecord: RegisterRecord) { }
    async handle(request: any) {
        try {
            const validation = this.validate(request)
            if (validation) {
                return HTTPBadRequest(new ParamsError(validation));
            }
            await this.registerRecord.execute(request);
            return Ok("created successfully");
        } catch (error) {
            return HTTPInternalServerError(error);
        }
    }

    validate(request: any): string | undefined {
        const schema = Joi.object({
            idAutomovel: Joi.number().required(),
            idMotorista: Joi.number().required(),

        })
        const validation = schema.validate(request)
        if (validation) {
            return validation.error?.message
        }
    }
}
