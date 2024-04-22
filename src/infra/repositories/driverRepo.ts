import { DriverModel } from "@/infra/entities";
import { CreateDriver, UpdateDriver, ExistsDriver, ListDriver } from "@/domain/contracts/repos/driver";
import { PgRepository } from "./repository";


export class DriverRepository extends PgRepository implements CreateDriver {

    async create({ nome }: CreateDriver.Input): Promise<void> {
        const repository = this.getRepository(DriverModel)
        await repository.save({ nome, created_at: new Date().toISOString(), status: true })
    }

    async update({ nome, status, id }: UpdateDriver.Input): Promise<void> {
        const repository = this.getRepository(DriverModel)
        await repository.update({ id: id }, { nome, status })

    }

    async exists(id: ExistsDriver.Input): ExistsDriver.Output {
        const repository = this.getRepository(DriverModel)
        return await repository.exists({ where: { id } })
    }

    async list({ offset = 0, limit = 10, nome }: ListDriver.Input): ListDriver.Output {
        const repository = this.getRepository(DriverModel)
        return await repository.find({ skip: offset, take: limit, where: { nome } })

    }

} 