import { HTTPBadRequest, HTTPInternalServerError, Ok, ParamsError } from "@/app/helpers";
import { FinishingRecord } from "@/domain/contracts/useCases/record";
import { Controller } from "../controller";
import Joi from "joi";

export class FinishRecordController implements Controller {
    constructor(private finishRecord: FinishingRecord) { }
    async handle(request: any) {
        try {
            const validation = this.validate(request)
            if (validation) {
                return HTTPBadRequest(new ParamsError(validation));
            }
            await this.finishRecord.execute(request)
            return Ok("records finished with successfully");
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
