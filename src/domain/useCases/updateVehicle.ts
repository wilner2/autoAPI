import { UpdateVehicle } from "@/contracts/repos/vehicle";
import { UpdateVehicleContract, UpdatingVehicle } from "@/contracts/useCases/updateVehicle";

export class UpdateAutoCase implements UpdateVehicleContract {
    constructor(private updateVehicle: UpdateVehicle) { }

    async execute(vehicle: UpdatingVehicle.Input): Promise<void> {
        await this.updateVehicle.update({
            placa: vehicle.placa, cor: vehicle.cor, marca: vehicle.marca, id: vehicle!.id, status: vehicle.status,
        })
    }
}