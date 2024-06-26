import { ExistsVehicle, UpdateVehicle } from "@/domain/contracts/repos/vehicle";
import { DeletingVehicle } from "@/domain/contracts/useCases/vehicles/deleteVehicle";

export class DeleteVehicleCase implements DeletingVehicle {
    constructor(private updateVehicle: UpdateVehicle, private existsVehicle: ExistsVehicle) { }

    async execute(vehicle: DeletingVehicle.Input): DeletingVehicle.Output {
        const existsVehicle = await this.existsVehicle.exists(parseInt(vehicle.id))
        if (!existsVehicle) {
            return { vehicleNotFounded: true }
        }
        await this.updateVehicle.update({ id: parseInt(vehicle.id), status: false })
        return { vehicleNotFounded: false }
    }
}