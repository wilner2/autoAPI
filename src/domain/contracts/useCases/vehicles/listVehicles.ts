export interface ListingVehicle {
    execute(request: ListingVehicle.Input): ListingVehicle.Output
}
export namespace ListingVehicle {
    export type Input = { offset?: string, limit?: string, marca?: string, cor?: string }
    export type Output = Promise<Array<{ id: Number, created_at: Date, status: boolean, placa: string, cor: string, marca: string }>>

}