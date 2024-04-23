export interface UpdatingDriver {
    execute(request: UpdatingDriver.Input): UpdatingDriver.Output
}
export namespace UpdatingDriver {
    export type Input = { id: number, nome: string, status: boolean }
    export type Output = Promise<{ driverNotFounded: boolean }>

}