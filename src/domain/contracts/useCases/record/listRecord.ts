export interface ListingRecord {
    execute(request: ListingRecord.Input): ListingRecord.Output
}
export namespace ListingRecord {
    export type Input = {
        offset?: string,
        limit?: string,
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