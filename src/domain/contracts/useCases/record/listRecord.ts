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