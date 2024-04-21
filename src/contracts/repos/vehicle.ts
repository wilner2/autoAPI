import { Vehicle } from "@/domain/entities/vehicle";

export interface CreateVehicle {
  create(vehicle: CreateVehicle.Input): Promise<CreateVehicle.Output>;
}

export namespace CreateVehicle {
  export type Input = { cor: string, marca: string, placa: string }
  export type Output = { cor: string; marca: string; placa: string; created_at: Date; status: true; }
}
export interface UpdateVehicle {
  update(vehicle: UpdateVehicle.Input): Promise<void>
}
export namespace UpdateVehicle {
  export type Input = Vehicle
}
