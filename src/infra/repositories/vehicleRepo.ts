import { Vehicle } from "@/infra/entities/vehicle";
import { CreateVehicle, UpdateVehicle } from "@/contracts/repos/vehicle";
import { PgRepository } from "./repository";


export class VehicleRepository extends PgRepository implements CreateVehicle, UpdateVehicle {

    async create({ cor, marca, placa }: CreateVehicle.Input) {
        const repository = this.getRepository(Vehicle)
        const response = await repository.save({ cor, marca, placa, created_at: new Date().toISOString(), status: true })
        return response
    }

    async update(vehicle: UpdateVehicle.Input): Promise<void> {

    }

} 