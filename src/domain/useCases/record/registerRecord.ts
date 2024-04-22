import { CreateRecord, RecordInProgress } from "@/domain/contracts/repos/record";
import { RegisterRecord } from "@/domain/contracts/useCases/record";

export class RegisterRecordCase implements RegisterRecord {
    constructor(private createRecord: CreateRecord, private recordInProgress: RecordInProgress) { }

    async execute(register: RegisterRecord.Input): RegisterRecord.Output {
        const existsRecordInProgress = await this.recordInProgress.findRecordInProgress(register)
        if (existsRecordInProgress) {
            return { recordInProgress: true }
        }
        await this.createRecord.create(register);
        return { recordInProgress: false }
    }
}
