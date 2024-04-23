import { ListDriver } from "@/domain/contracts/repos/driver";
import { ListingDriver } from "@/domain/contracts/useCases/driver";

export class ListDriverCase implements ListingDriver {
    constructor(private listDriver: ListDriver) { }
    async execute({ offset = "0", limit = "10", nome }: ListingDriver.Input): ListingDriver.Output {
        return await this.listDriver.list({ nome, limit: parseInt(limit), offset: parseInt(offset) })
    }
}