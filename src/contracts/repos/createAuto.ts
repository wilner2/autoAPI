export interface CreateAuto {
  create(user: CreateAuto.Input): Promise<void>;
}

export namespace CreateAuto {
  export type Input = { cor: string, marca: string, placa: string }
}
