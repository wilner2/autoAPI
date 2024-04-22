import { DriverModel } from "@/infra/entities";
import { CreateDriver } from "@/domain/contracts/repos/driver";
import { PgRepository } from "./repository";


export class DriverRepository extends PgRepository implements CreateDriver {

    async create({ nome }: CreateDriver.Input): Promise<void> {
        const repository = this.getRepository(DriverModel)
        await repository.save({ nome, created_at: new Date().toISOString(), status: true })
    }


} 