export interface UpdateDriverContract {
    execute(request: UpdateDriverContract.Input): UpdateDriverContract.Output
}
export namespace UpdateDriverContract {
    export type Input = { id: number, nome: string, }
    export type Output = Promise<{ driverNotFounded: Boolean }>

}