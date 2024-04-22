import { RegisterRecord } from "@/domain/contracts/useCases/record";
import { HTTPBadRequest, HTTPConflict, HTTPInternalServerError, Ok, ParamsError, RecordInProgress } from "@/app/helpers";
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
            const result = await this.registerRecord.execute(request);
            if (result.recordInProgress) {
                return HTTPConflict(new RecordInProgress("Vehicle or Driver with record in progress"))
            }
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
