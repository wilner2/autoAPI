import { RecordModel } from "@/infra/entities";
import { CreateRecord, RecordInProgress, FinishRecord, ListRecord } from "@/domain/contracts/repos/record";
import { PgRepository } from "./repository";


export class RecordRepository extends PgRepository implements CreateRecord, RecordInProgress, FinishRecord, ListRecord {

    async create({ idAutomovel, idMotorista, desc }: CreateRecord.Input): Promise<void> {
        const repository = this.getRepository(RecordModel)
        await repository.save({ idMotorista, idAutomovel, desc, inProgress: true, inicio: new Date().toISOString() })
    }

    async findRecordInProgress({ idAutomovel, idMotorista }: RecordInProgress.Input): Promise<boolean> {
        const repository = this.getRepository(RecordModel)
        return await repository.exists({ where: [{ inProgress: true, automovel: { id: idAutomovel } }, { inProgress: true, motorista: { id: idMotorista } }] })
    }

    async update({ id, inProgress, fim }: FinishRecord.Input): Promise<void> {
        const repository = this.getRepository(RecordModel)
        await repository.update({ id: id }, { inProgress, fim: fim.toISOString() })
    }

    async list({ offset, limit, inicio, fim, motorista, placa, desc, cor, marca }: ListRecord.Input): Promise<RecordModel[]> {
        const repository = this.getRepository(RecordModel)
        return await repository.find({
            skip: offset, take: limit,
            where: {
                desc,
                motorista: { nome: motorista },
                automovel: { placa, cor, marca }
            }

        })

    }
} 