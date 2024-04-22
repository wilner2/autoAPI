
export interface CreateDriver {
    create(vehicle: CreateDriver.Input): Promise<void>;

}

export namespace CreateDriver {
    export type Input = { nome: string }
}