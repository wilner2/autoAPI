
export interface RegisterDriver {
    execute(request: RegisterDriver.Input): Promise<void>;
}
export namespace RegisterDriver {
    export type Input = { nome: string }
}