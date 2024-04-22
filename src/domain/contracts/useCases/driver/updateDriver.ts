export interface UpdatingDriver {
    execute(request: UpdatingDriver.Input): UpdatingDriver.Output
}
export namespace UpdatingDriver {
    export type Input = { id: number, nome: string, }
    export type Output = Promise<{ driverNotFounded: Boolean }>

}