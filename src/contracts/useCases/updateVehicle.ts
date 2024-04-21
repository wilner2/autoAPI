import { Vehicle } from "@/domain/entities/vehicle"

export interface UpdateVehicleContract {
    execute(request: UpdatingVehicle.Input): Promise<void>
}
export namespace UpdatingVehicle {
    export type Input = Vehicle
}