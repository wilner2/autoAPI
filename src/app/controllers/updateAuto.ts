import Joi from "joi"
import { ParamsError } from "@/app/helpers/excepetions";
import { HTTPBadRequest, HTTPInternalServerError, Ok } from "@/app/helpers/http";
import { UpdateAutoContract } from "@/contracts/useCases/updateAuto";

interface UpdatingAuto {
    handle(request: any): Promise<UpdatingAuto.Output>
}
export namespace UpdatingAuto {
    export type Output = { statusCode: number, msg: any }
}


export class UpdateAutoController implements UpdatingAuto {
    constructor(private updateAutoCase: UpdateAutoContract) { }

    async handle(request: any): Promise<UpdatingAuto.Output> {
        try {

            const validation = this.validate(request)
            if (validation) {
                return HTTPBadRequest(new ParamsError(validation));
            }
            await this.updateAutoCase.execute(request)
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

