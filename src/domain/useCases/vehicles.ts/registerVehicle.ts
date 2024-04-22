import { CreateVehicle } from "@/domain/contracts/repos/vehicle";
import { RegisterVehicle } from "@/domain/contracts/useCases/vehicles";

export class RegisterVehicleCase implements RegisterVehicle {
  constructor(private createVehicle: CreateVehicle) { }

  async execute(vehicle: { placa: string; cor: string; marca: string }): Promise<void> {
    await this.createVehicle.create(vehicle);
  }
}
