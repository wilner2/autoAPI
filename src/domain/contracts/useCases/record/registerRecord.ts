
export interface RegisterRecord {
    execute(request: RegisterRecord.Input): RegisterRecord.Output;
}
export namespace RegisterRecord {
    export type Input = { idAutomovel: number, idMotorista: number, }
    export type Output = Promise<void | { recordInProgress: boolean }>
}