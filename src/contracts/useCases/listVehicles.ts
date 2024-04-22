export interface ListingVehicle {
    execute(request: ListingVehicle.Input): ListingVehicle.Output
}
export namespace ListingVehicle {
    export type Input = { offset: string, limit: string, marca?: string, cor?: string }
    export type Output = Promise<Array<{ id: Number, create_at: Date, status: Boolean, placa: string, cor: string, marca: string }>>

}