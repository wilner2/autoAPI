import { CreateVehicle } from "@/contracts/repos/createVehicle";
import { RegisterVehicle } from "@/contracts/useCases/registerVehicle";
import { Vehicle } from "@/domain/entities/vehicle";

export class RegisterVehicleCase implements RegisterVehicle {
  constructor(private createVehicle: CreateVehicle) { }

  async execute(request: { placa: string; cor: string; marca: string }) {
    const vehicle = new Vehicle(request.placa, request.cor, request.marca);
    await this.createVehicle.create(vehicle);
  }
}
