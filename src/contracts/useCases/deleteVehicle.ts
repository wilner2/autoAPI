
export interface DeleteVehicle {
    execute(request: DeleteVehicle.Input): Promise<void>;
}
export namespace DeleteVehicle {
    export type Input = { id: string }
}