
export interface DeletingDriver {
    execute(request: DeletingDriver.Input): DeletingDriver.Output;
}
export namespace DeletingDriver {
    export type Input = { id: string }
    export type Output = Promise<{ driverNotFounded: Boolean }>
}