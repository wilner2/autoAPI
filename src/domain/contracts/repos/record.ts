export interface CreateRecord {
    create(register: CreateRecord.Register, driver: CreateRecord.Driver, vehicle: CreateRecord.Vehicle): Promise<void>;
}
export namespace CreateRecord {
    export type Register = { idMotorista: number, idAutomovel: number, desc: string }
    export type Vehicle = { id: number, created_at: Date, status: boolean, placa: string, cor: string, marca: string }
    export type Driver = { id: number, created_at: Date, status: boolean, nome: string }

}

export interface RecordInProgress {
    findRecordInProgress(record: RecordInProgress.Input): Promise<boolean>;
}
export namespace RecordInProgress {
    export type Input = { idMotorista: number, idAutomovel: number }
}

export interface FinishRecord {
    update(id: FinishRecord.Input): Promise<void>;
}
export namespace FinishRecord {
    export type Input = { id: number, inProgress: boolean, fim: Date }
}

export interface ListRecord {
    list(data: ListRecord.Input): ListRecord.Output
}

export namespace ListRecord {
    export type Input = {
        offset: number,
        limit: number,
        inicio?: string,
        fim?: string,
        motorista?: string,
        placa?: string,
        desc?: string,
        cor?: string,
        marca?: string
    }
    export type Output = Promise<{
        id: number,
        automovel: { marca: string, placa: string, cor: string, created_at: Date, id: number, status: boolean },
        motorista: { nome: string, id: number, created_at: Date, status: boolean },
        inProgress: boolean,
        inicio: Date,
        fim: Date,
        desc: string
    }[]>
}