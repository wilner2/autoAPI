import { ListRecord } from "@/domain/contracts/repos/record";
import { ListingRecord } from "@/domain/contracts/useCases/record";

export class ListRecordCase implements ListingRecord {
    constructor(private listRecord: ListRecord) { }
    async execute({ offset = "0", limit = "10", cor, desc, fim, inicio, marca, motorista, placa }: ListingRecord.Input): ListingRecord.Output {
        return await this.listRecord.list({ cor, desc, fim, inicio, marca, motorista, placa, limit: parseInt(limit), offset: parseInt(offset) })
    }
}