
export interface RegisterVehicle {
  execute(request: RegisterVehicle.Input): Promise<void>;
}
export namespace RegisterVehicle {
  export type Input = { placa: string; cor: string; marca: string }
}