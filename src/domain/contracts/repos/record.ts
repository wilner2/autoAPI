export interface CreateRecord {
    create(record: CreateRecord.Input): Promise<void>;
}
export namespace CreateRecord {
    export type Input = { idMotorista: number, idAutomovel: number, desc: string }
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
    export type Input = { id: number, inProgress: boolean }
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
    export type Output = Promise<Array<{
        id: number,
        marca: string,
        placa: string,
        cor: string,
        motorista: string,
        status: boolean,
        inicio: Date,
        fim: Date,
        desc: string
    }>>
}