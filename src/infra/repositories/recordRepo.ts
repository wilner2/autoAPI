import { RecordModel } from "@/infra/entities";
import { CreateRecord, RecordInProgress, FinishRecord } from "@/domain/contracts/repos/record";
import { PgRepository } from "./repository";


export class RecordRepository extends PgRepository implements CreateRecord, RecordInProgress, FinishRecord {

    async create({ idAutomovel, idMotorista, desc }: CreateRecord.Input): Promise<void> {
        const repository = this.getRepository(RecordModel)
        await repository.save({ idMotorista, idAutomovel, desc, inProgress: true, inicio: new Date().toISOString() })
    }

    async findRecordInProgress({ idAutomovel, idMotorista }: RecordInProgress.Input): Promise<boolean> {
        const repository = this.getRepository(RecordModel)
        return await repository.exists({ where: [{ inProgress: true, idAutomovel }, { inProgress: true, idMotorista }] })
    }

    async update({ id, inProgress }: FinishRecord.Input): Promise<void> {
        const repository = this.getRepository(RecordModel)
        await repository.update({ id: id }, { inProgress })
    }
} 