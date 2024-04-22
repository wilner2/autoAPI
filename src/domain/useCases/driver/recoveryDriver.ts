import { ExistsDriver, UpdateDriver } from "@/domain/contracts/repos/driver";
import { RecoveringDriver } from "@/domain/contracts/useCases/driver";

export class RecoveryDriverCase implements RecoveringDriver {
    constructor(private updateDriver: UpdateDriver, private existsDriver: ExistsDriver) { }

    async execute(driver: RecoveringDriver.Input): RecoveringDriver.Output {
        const existsDriver = await this.existsDriver.exists(parseInt(driver.id))
        if (!existsDriver) {
            return { driverNotFounded: true }
        }
        await this.updateDriver.update({ id: parseInt(driver.id), status: true })
        return { driverNotFounded: false }
    }
}