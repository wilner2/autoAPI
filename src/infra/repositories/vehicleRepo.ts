import { VehicleModel } from "@/infra/entities/vehicle";
import { CreateVehicle, UpdateVehicle } from "@/contracts/repos/vehicle";
import { PgRepository } from "./repository";


export class VehicleRepository extends PgRepository implements CreateVehicle, UpdateVehicle {

    async create({ cor, marca, placa }: CreateVehicle.Input): Promise<CreateVehicle.Output> {
        const repository = this.getRepository(VehicleModel)
        const response = await repository.save({ cor, marca, placa, created_at: new Date().toISOString(), status: true })
        return response
    }

    async update({ cor, marca, status, placa, id }: UpdateVehicle.Input): Promise<void> {
        const repository = this.getRepository(VehicleModel)
        await repository.update({ id: id }, { cor, marca, status, placa })

    }

} 