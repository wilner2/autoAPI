import { Auto } from "@/infra/entities/auto";
import { CreateAuto } from "@/contracts/repos/createAuto";
import { PgRepository } from "./repository";


export class AutoRepository extends PgRepository implements CreateAuto {

    async create({ cor, marca, placa }: CreateAuto.Input) {
        const repository = this.getRepository(Auto)
        return await repository.save({ cor, marca, placa, created_at: new Date().toISOString(), status: true })

    }

} 