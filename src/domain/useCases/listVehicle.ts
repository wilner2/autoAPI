import { ListVehicle } from "@/contracts/repos/vehicle";
import { ListingVehicle } from "@/contracts/useCases/listVehicles";

export class ListVehicleCase implements ListingVehicle {
    constructor(private listVehicles: ListVehicle) { }
    async execute(request: ListingVehicle.Input): ListingVehicle.Output {
        return await this.listVehicles.list({ ...request, limit: parseInt(request.limit), offset: parseInt(request.offset) })

    }
}