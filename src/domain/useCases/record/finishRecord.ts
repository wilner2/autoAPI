import { FinishRecord } from "@/domain/contracts/repos/record";
import { FinishingRecord } from "@/domain/contracts/useCases/record";

export class finishRecordCase implements FinishingRecord {
    constructor(private finishrecord: FinishRecord) { }

    async execute(record: FinishingRecord.Input): Promise<void> {
        await this.finishrecord.update({ id: record.id, inProgress: false })
    }
}
