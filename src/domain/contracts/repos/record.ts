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