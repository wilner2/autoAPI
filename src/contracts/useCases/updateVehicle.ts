export interface UpdateVehicleContract {
    execute(request: UpdatingVehicle.Input): Promise<void>
}
export namespace UpdatingVehicle {
    export type Input = { id: number, placa: string, cor: string, marca: string, status: Boolean }
}