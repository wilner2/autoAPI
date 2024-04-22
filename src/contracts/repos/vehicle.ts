import { VehicleModel } from "@/infra/entities/vehicle";

export interface CreateVehicle {
  create(vehicle: CreateVehicle.Input): Promise<CreateVehicle.Output>;
}

export namespace CreateVehicle {
  export type Input = {
    placa: string, cor: string, marca: string,
  }
  export type Output = VehicleModel
}



export interface UpdateVehicle {
  update(vehicle: UpdateVehicle.Input): Promise<void>
}
export namespace UpdateVehicle {
  export type Input = {
    placa?: string, cor?: string, marca?: string, id: number, status?: boolean,
  }
}


export interface ExistsVehicle {
  exists(id: ExistsVehicle.Input): ExistsVehicle.Output
}
export namespace ExistsVehicle {
  export type Input = number
  export type Output = Promise<boolean>

}