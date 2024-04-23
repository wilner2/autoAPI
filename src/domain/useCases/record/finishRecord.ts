import { FinishRecord } from "@/domain/contracts/repos/record";
import { FinishingRecord } from "@/domain/contracts/useCases/record";

export class finishRecordCase implements FinishingRecord {
    constructor(private finishRecord: FinishRecord) { }

    async execute(record: FinishingRecord.Input): Promise<void> {
        await this.finishRecord.update({ id: record.id, inProgress: false })
    }
}
