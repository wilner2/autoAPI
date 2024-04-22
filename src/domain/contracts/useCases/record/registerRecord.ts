
export interface RegisterRecord {
    execute(request: RegisterRecord.Input): RegisterRecord.Output;
}
export namespace RegisterRecord {
    export type Input = { idAutomovel: number, idMotorista: number, desc: string }
    export type Output = Promise<{ recordInProgress: boolean }>
}