import { ListingRecord } from "@/domain/contracts/useCases/record";
import { Controller } from "../controller";
import { HTTPBadRequest, HTTPInternalServerError, HttpResponse, Ok, ParamsError } from "@/app/helpers";
import Joi from "joi";

export class ListRecordController implements Controller {
    constructor(private listingRecord: ListingRecord) { }

    async handle(request: any): Promise<HttpResponse> {
        try {
            const validation = this.validate(request)
            if (validation) {
                return HTTPBadRequest(new ParamsError(validation));
            }
            const response = await this.listingRecord.execute(request)
            return Ok(response)
        } catch (error) {
            return HTTPInternalServerError(error)
        }
    }

    validate(request: any): string | undefined {
        const schema = Joi.object({
            offset: Joi.string(),
            limit: Joi.string(),
            inicio: Joi.date(),
            fim: Joi.date(),
            motorista: Joi.string(),
            placa: Joi.string(),
            desc: Joi.string(),
            cor: Joi.string(),
            marca: Joi.string(),
        })
        return schema.validate(request).error?.message

    }
}