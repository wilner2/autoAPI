import Joi from "joi"
import { ParamsError } from "../helpers/excepetions";
import { HTTPBadRequest } from "../helpers/http";

export interface UpdatingAuto {
    handle(request: UpdatingAuto.Input): Promise<UpdatingAuto.Output>
}
export namespace UpdatingAuto {
    export type Input = { id?: number, placa?: string, cor?: string, marca?: string, status?: Boolean }
    export type Output = { statusCode: number, msg: any }
}


export class UpdateAuto implements UpdatingAuto {
    constructor() { }

    async handle(request: UpdatingAuto.Input): Promise<UpdatingAuto.Output> {
        const validation = this.validate(request)
        if (validation) {
            return HTTPBadRequest(new ParamsError(validation));
        }
        // return { statusCode: 200, msg: request }
    }
    validate(request: UpdatingAuto.Input) {
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

