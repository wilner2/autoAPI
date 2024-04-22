
export interface RecoveringDriver {
    execute(request: RecoveringDriver.Input): RecoveringDriver.Output;
}
export namespace RecoveringDriver {
    export type Input = { id: string }
    export type Output = Promise<{ driverNotFounded: Boolean }>
}