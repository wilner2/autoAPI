import { ListingDriver } from "@/domain/contracts/useCases/driver";
import { Controller } from "../controller";
import { HTTPBadRequest, HTTPInternalServerError, HttpResponse, Ok, ParamsError } from "@/app/helpers";
import Joi from "joi";

export class ListDriverController implements Controller {
    constructor(private listingdriver: ListingDriver) { }

    async handle(request: any): Promise<HttpResponse> {
        try {
            const validation = this.validate(request)
            if (validation) {
                return HTTPBadRequest(new ParamsError(validation));
            }
            const response = await this.listingdriver.execute(request)
            return Ok(response)
        } catch (error) {
            return HTTPInternalServerError(error)
        }
    }

    validate(request: any): string | undefined {
        const schema = Joi.object({
            nome: Joi.string(),
            offset: Joi.string(),
            limit: Joi.string(),
        })
        const validation = schema.validate(request)
        if (validation) {
            return validation.error?.message
        }

    }
}