import { CreateRecord, RecordInProgress } from "@/domain/contracts/repos/record";
import { FindByID as FindByIDVehicle } from "@/domain/contracts/repos/vehicle";
import { FindByID as FindByIDDriver } from "@/domain/contracts/repos/driver";

import { RegisterRecord } from "@/domain/contracts/useCases/record";

export class RegisterRecordCase implements RegisterRecord {
    constructor(private createRecord: CreateRecord, private recordInProgress: RecordInProgress, private findOneVehicle: FindByIDVehicle, private findOneDriver: FindByIDDriver) { }

    async execute(register: RegisterRecord.Input): RegisterRecord.Output {
        const driver = await this.findOneDriver.findById(register.idMotorista)
        if (!driver) {
            return { driverNotFound: true }
        }
        const vehicle = await this.findOneVehicle.findById(register.idAutomovel)
        if (!vehicle) {
            return { vehicleNotFound: true }
        }
        const existsRecordInProgress = await this.recordInProgress.findRecordInProgress(register)
        if (existsRecordInProgress) {
            return { recordInProgress: true }
        }
        await this.createRecord.create(register, driver, vehicle);
        return { recordInProgress: false }
    }
}
