import { ListVehicle } from "@/domain/contracts/repos/vehicle";
import { ListingVehicle } from "@/domain/contracts/useCases/vehicles";

export class ListVehicleCase implements ListingVehicle {
    constructor(private listVehicles: ListVehicle) { }
    async execute({ limit = "10", offset = "0", cor, marca }: ListingVehicle.Input): ListingVehicle.Output {
        return await this.listVehicles.list({ limit: parseInt(limit), offset: parseInt(offset), cor, marca })

    }
}