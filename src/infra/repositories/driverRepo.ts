import { DriverModel } from "@/infra/entities";
import { CreateDriver, UpdateDriver, ExistsDriver, ListDriver, FindByID } from "@/domain/contracts/repos/driver";
import { PgRepository } from "./repository";
import { Like } from "typeorm";


export class DriverRepository extends PgRepository implements CreateDriver, ListDriver, ExistsDriver, UpdateDriver, FindByID {

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
        return await repository.find({ skip: offset, take: limit, where: { nome: Like(`%${nome}%`) } })

    }

    async findById(id: number): FindByID.Output {
        const repository = this.getRepository(DriverModel)
        return await repository.findOneBy({ id })
    }


} 