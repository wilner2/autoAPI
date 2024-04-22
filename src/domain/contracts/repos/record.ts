export interface CreateRecord {
    create(vehicle: CreateRecord.Input): Promise<void>;
}
export namespace CreateRecord {
    export type Input = { idMotorista: number, idAutomovel: number, desc: string }
}

export interface RecordInProgress {
    findRecordInProgress(vehicle: RecordInProgress.Input): Promise<boolean>;
}
export namespace RecordInProgress {
    export type Input = { idMotorista: number, idAutomovel: number }
}