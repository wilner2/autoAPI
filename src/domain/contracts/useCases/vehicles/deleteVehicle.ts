
export interface DeletingVehicle {
    execute(request: DeletingVehicle.Input): DeletingVehicle.Output;
}
export namespace DeletingVehicle {
    export type Input = { id: string }
    export type Output = Promise<{ vehicleNotFounded: boolean }>
}