
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
    export type Input = { nome?: string, }
}