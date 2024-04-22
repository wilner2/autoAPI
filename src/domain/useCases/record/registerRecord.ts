import { CreateRecord } from "@/domain/contracts/repos/record";
import { RegisterRecord } from "@/domain/contracts/useCases/record";

export class RegisterRecordCase implements RegisterRecord {
    constructor(private createRecord: CreateRecord) { }

    async execute(vehicle: RegisterRecord.Input): Promise<void> {
        await this.createRecord.create(vehicle);
    }
}
