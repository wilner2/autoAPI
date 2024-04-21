export interface UpdateAutoContract {
    execute(request: UpdatingAuto.Input): Promise<void>
}
export namespace UpdatingAuto {
    export type Input = { id: number, placa: string, cor: string, marca: string, status: Boolean }
}