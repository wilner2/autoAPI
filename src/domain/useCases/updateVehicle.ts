import { UpdateVehicle } from "@/contracts/repos/vehicle";
import { UpdateVehicleContract, UpdatingVehicle } from "@/contracts/useCases/updateVehicle";

export class UpdateAutoCase implements UpdateVehicleContract {
    constructor(private updateVehicle: UpdateVehicle) { }

    async execute(request: UpdatingVehicle.Input): Promise<void> {
        await this.updateVehicle.update(request)
    }
}