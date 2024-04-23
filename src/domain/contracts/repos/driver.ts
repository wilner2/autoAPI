
export interface CreateDriver {
    create(vehicle: CreateDriver.Input): Promise<void>;
}

export namespace CreateDriver {
    export type Input = { nome: string }
}

export interface ExistsDriver {
    exists(id: ExistsDriver.Input): ExistsDriver.Output
}
export namespace ExistsDriver {
    export type Input = number
    export type Output = Promise<boolean>
}

export interface UpdateDriver {
    update(vehicle: UpdateDriver.Input): Promise<void>
}
export namespace UpdateDriver {
    export type Input = { id: number, status?: boolean, nome?: string }
}

export interface ListDriver {
    list(data: ListDriver.Input): ListDriver.Output
}

export namespace ListDriver {
    export type Input = { nome?: string, limit: number, offset: number }
    export type Output = Promise<Array<{ id: number, created_at: Date, status: boolean, nome: string }>>
}

export interface FindByID {
    findById(id: FindByID.Input): FindByID.Output
}

export namespace FindByID {
    export type Input = number
    export type Output = Promise<{ id: number, created_at: Date, status: boolean, nome: string } | null>
}