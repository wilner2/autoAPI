import { VehicleModel } from "@/infra/entities";

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

export interface ListVehicle {
  list(data: ListVehicle.Input): ListVehicle.Output
}

export namespace ListVehicle {
  export type Input = { marca?: string, cor?: string, limit: number, offset: number }
  export type Output = Promise<Array<{ id: number, created_at: Date, status: boolean, placa: string, cor: string, marca: string }>>
}

export interface FindByID {
  findById(id: FindByID.Input): FindByID.Output
}

export namespace FindByID {
  export type Input = number
  export type Output = Promise<{ id: number, created_at: Date, status: boolean, placa: string, cor: string, marca: string } | null>
}