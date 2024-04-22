import { ExistsVehicle, UpdateVehicle } from "@/contracts/repos/vehicle";
import { RecoveringVehicle } from "@/contracts/useCases/recoveryVehicle";

export class RecoveryVehicleCase implements RecoveringVehicle {
    constructor(private updateVehicle: UpdateVehicle, private existsVehicle: ExistsVehicle) { }

    async execute(vehicle: RecoveringVehicle.Input): RecoveringVehicle.Output {
        const existsVehicle = await this.existsVehicle.exists(parseInt(vehicle.id))
        if (!existsVehicle) {
            return { vehicleNotFounded: true }
        }
        await this.updateVehicle.update({ id: parseInt(vehicle.id), status: true })
        return { vehicleNotFounded: false }
    }
}