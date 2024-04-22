import { VehicleModel } from "@/infra/entities/vehicle"

export class Vehicle {
  constructor(
    public placa: string,
    public cor: string,
    public marca: string,
    public id?: number,
    public status?: boolean,

  ) { }


  update(vehicleModel: VehicleModel): VehicleModel {
    vehicleModel.cor = this.cor
    vehicleModel.marca = this.marca
    vehicleModel.placa = this.placa
    vehicleModel.status = this.status || vehicleModel.status

    return vehicleModel
  }
}

