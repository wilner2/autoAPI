import { UpdateVehicle } from "@/contracts/repos/vehicle";
import { UpdateVehicleContract, UpdatingVehicle } from "@/contracts/useCases/updateVehicle";
import { Vehicle } from "../entities/vehicle";

export class UpdateAutoCase implements UpdateVehicleContract {
    constructor(private updateVehicle: UpdateVehicle) { }

    async execute(request: UpdatingVehicle.Input): Promise<void> {
        const vehicle = new Vehicle(request.placa, request.cor, request.marca, request.id, request.status)

        await this.updateVehicle.update(vehicle)
    }
}