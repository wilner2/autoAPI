export interface UpdateVehicleContract {
    execute(request: UpdatingVehicle.Input): UpdatingVehicle.Output
}
export namespace UpdatingVehicle {
    export type Input = { placa: string, cor: string, marca: string, id: number, status: boolean, }
    export type Output = Promise<{ vehicleNotFounded: Boolean }>

}