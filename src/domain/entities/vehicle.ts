export class Vehicle {
  constructor(
    public placa: string,
    public cor: string,
    public marca: string,
    public id?: number,
    public status?: boolean,

  ) { }

  static create(data: {
    placa: string,
    cor: string,
    marca: string,
    id?: number,
    status?: boolean
  }) {
    return new Vehicle(data.placa, data.cor, data.marca, data?.id, data?.status)
  }
}

