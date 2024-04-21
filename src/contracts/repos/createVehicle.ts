export interface CreateVehicle {
  create(user: CreateVehicle.Input): Promise<CreateVehicle.Output>;
}

export namespace CreateVehicle {
  export type Input = { cor: string, marca: string, placa: string }
  export type Output = { cor: string; marca: string; placa: string; created_at: Date; status: true; }
}
