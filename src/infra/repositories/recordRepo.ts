import { RecordModel } from "@/infra/entities";
import { CreateRecord, RecordInProgress } from "@/domain/contracts/repos/record";
import { PgRepository } from "./repository";


export class RecordRepository extends PgRepository implements CreateRecord, RecordInProgress {

    async create({ idAutomovel, idMotorista, desc }: CreateRecord.Input): Promise<void> {
        const repository = this.getRepository(RecordModel)
        await repository.save({ idMotorista, idAutomovel, desc, inProgress: true, inicio: new Date().toISOString() })
    }

    async findRecordInProgress({ idAutomovel, idMotorista }: RecordInProgress.Input): Promise<boolean> {
        const repository = this.getRepository(RecordModel)
        return await repository.exists({ where: [{ inProgress: true, idAutomovel }, { inProgress: true, idMotorista }] })
    }
} 