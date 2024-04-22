
export interface RegisterRecord {
    execute(request: RegisterRecord.Input): Promise<void>;
}
export namespace RegisterRecord {
    export type Input = { idAutomovel: number, idMotorista: number, }
}