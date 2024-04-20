export interface CreateAuto {
  create(user: CreateAuto.Input): Promise<CreateAuto.Output>;
}

export namespace CreateAuto {
  export type Input = { cor: string, marca: string, placa: string }
  export type Output = { cor: string; marca: string; placa: string; created_at: Date; status: true; }
}
