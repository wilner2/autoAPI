export interface CreateRecord {
    create(vehicle: CreateRecord.Input): Promise<void>;
}
export namespace CreateRecord {
    export type Input = { idMotorista: number, idAutomovel: number }
}