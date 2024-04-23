import { ListRecord } from "@/domain/contracts/repos/record";
import { ListingRecord } from "@/domain/contracts/useCases/record";

export class ListRecordCase implements ListingRecord {
    constructor(private listRecord: ListRecord) { }
    async execute({ offset = "0", limit = "10", cor, desc, fim, inicio, marca, motorista, placa }: ListingRecord.Input): ListingRecord.Output {
        const result = await this.listRecord.list({ cor, desc, fim, inicio, marca, motorista, placa, limit: parseInt(limit), offset: parseInt(offset) })
        return result.map(data => {
            return {
                id: data.id,
                automovel: { ...data.automovel },
                motorista: { ...data.motorista },
                inProgress: data.inProgress,
                inicio: data.inicio,
                fim: data.fim,
                desc: data.desc
            }
        })
    }
}