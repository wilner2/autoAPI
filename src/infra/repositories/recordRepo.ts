import { DriverModel, RecordModel, VehicleModel } from "@/infra/entities";
import { CreateRecord, RecordInProgress, FinishRecord, ListRecord } from "@/domain/contracts/repos/record";
import { PgRepository } from "./repository";


export class RecordRepository extends PgRepository implements CreateRecord, RecordInProgress, FinishRecord, ListRecord {

    async create(register: CreateRecord.Register, driver: CreateRecord.Driver, vehicle: CreateRecord.Vehicle): Promise<void> {
        const repository = this.getRepository(RecordModel)
        const record = new RecordModel()
        const motorista = new DriverModel()
        const automovel = new VehicleModel()

        motorista.id = driver.id
        motorista.created_at = driver.created_at
        motorista.status = driver.status
        motorista.nome = driver.nome
        motorista.registro = [record]

        automovel.cor = vehicle.cor
        automovel.id = vehicle.id
        automovel.created_at = vehicle.created_at
        automovel.marca = vehicle.marca
        automovel.placa = vehicle.placa
        automovel.status = vehicle.status
        automovel.registro = [record]

        record.inProgress = true
        record.inicio = new Date()
        record.desc = register.desc

        await this.getRepository(RecordModel).manager.save(motorista)
        await this.getRepository(RecordModel).manager.save(automovel)
        await repository.save(record)

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
            relations: {
                motorista: true,
                automovel: true
            },
            where: {
                desc,
                motorista: { nome: motorista },
                automovel: { placa, cor, marca }
            }

        })

    }
} 