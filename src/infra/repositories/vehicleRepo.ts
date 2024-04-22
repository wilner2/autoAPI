import { VehicleModel } from "@/infra/entities/vehicle";
import { CreateVehicle, UpdateVehicle, ExistsVehicle, ListVehicle } from "@/contracts/repos/vehicle";
import { PgRepository } from "./repository";


export class VehicleRepository extends PgRepository implements CreateVehicle, UpdateVehicle, ExistsVehicle, ListVehicle {

    async create({ cor, marca, placa }: CreateVehicle.Input): Promise<CreateVehicle.Output> {
        const repository = this.getRepository(VehicleModel)
        const response = await repository.save({ cor, marca, placa, created_at: new Date().toISOString(), status: true })
        return response
    }

    async update({ cor, marca, status, placa, id }: UpdateVehicle.Input): Promise<void> {
        const repository = this.getRepository(VehicleModel)
        await repository.update({ id: id }, { cor, marca, status, placa })

    }

    async exists(id: ExistsVehicle.Input): ExistsVehicle.Output {
        const repository = this.getRepository(VehicleModel)
        return await repository.exists({ where: { id } })
    }

    async list({ offset = 0, limit = 10, marca, cor }: ListVehicle.Input): ListVehicle.Output {
        const repository = this.getRepository(VehicleModel)
        return await repository.find({ skip: offset, take: limit, where: { marca: marca, cor: cor } })

    }


} 