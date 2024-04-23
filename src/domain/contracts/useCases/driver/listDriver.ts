export interface ListingDriver {
    execute(request: ListingDriver.Input): ListingDriver.Output
}
export namespace ListingDriver {
    export type Input = { offset?: string, limit?: string, nome?: string }
    export type Output = Promise<Array<{ id: Number, created_at: Date, status: boolean, nome: string }>>

}