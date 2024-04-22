import { ListDriver } from "@/domain/contracts/repos/driver";
import { ListingDriver } from "@/domain/contracts/useCases/driver";

export class ListDriverCase implements ListingDriver {
    constructor(private listdriver: ListDriver) { }
    async execute(request: ListingDriver.Input): ListingDriver.Output {
        return await this.listdriver.list({ ...request, limit: parseInt(request.limit), offset: parseInt(request.offset) })

    }
}