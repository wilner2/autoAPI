import { CreateAuto } from "@/contracts/repos/createAuto";
import { RegisterAuto } from "@/contracts/useCases/registerAuto";
import { Auto } from "@/domain/entities/auto";

export class RegisterAutoCase implements RegisterAuto {
  constructor(private createAuto: CreateAuto) { }

  async execute(request: { placa: string; cor: string; marca: string }) {
    const auto = new Auto(request.placa, request.cor, request.marca);
    await this.createAuto.create(auto);
  }
}
