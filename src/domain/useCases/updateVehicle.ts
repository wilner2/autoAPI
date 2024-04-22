import { ExistsVehicle, UpdateVehicle } from "@/contracts/repos/vehicle";
import { UpdateVehicleContract, UpdatingVehicle } from "@/contracts/useCases/updateVehicle";

export class UpdateVehicleCase implements UpdateVehicleContract {
    constructor(private updateVehicle: UpdateVehicle, private existsVehicle: ExistsVehicle) { }

    async execute(vehicle: UpdatingVehicle.Input): UpdatingVehicle.Output {
        const existsVehicle = await this.existsVehicle.exists(vehicle.id)
        if (!existsVehicle) {
            return { vehicleNotFounded: true }
        }

        await this.updateVehicle.update({
            placa: vehicle.placa, cor: vehicle.cor, marca: vehicle.marca, id: vehicle!.id, status: vehicle.status,
        })
        return { vehicleNotFounded: false }
    }
}