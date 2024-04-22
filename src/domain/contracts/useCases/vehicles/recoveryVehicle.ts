
export interface RecoveringVehicle {
    execute(request: RecoveringVehicle.Input): RecoveringVehicle.Output;
}
export namespace RecoveringVehicle {
    export type Input = { id: string }
    export type Output = Promise<{ vehicleNotFounded: Boolean }>
}