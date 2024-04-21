import { Vehicle } from "@/infra/entities/vehicle";
import { CreateVehicle } from "@/contracts/repos/createVehicle";
import { PgRepository } from "./repository";


export class VehicleRepository extends PgRepository implements CreateVehicle {

    async create({ cor, marca, placa }: CreateVehicle.Input) {
        const repository = this.getRepository(Vehicle)
        const response = await repository.save({ cor, marca, placa, created_at: new Date().toISOString(), status: true })
        return response
    }

} 