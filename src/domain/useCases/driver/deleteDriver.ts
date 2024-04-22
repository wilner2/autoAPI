import { ExistsDriver, UpdateDriver } from "@/domain/contracts/repos/driver";
import { DeletingDriver } from "@/domain/contracts/useCases/driver";

export class DeleteDriverCase implements DeletingDriver {
    constructor(private updateDriver: UpdateDriver, private existsdriver: ExistsDriver) { }

    async execute(driver: DeletingDriver.Input): DeletingDriver.Output {
        const existsdriver = await this.existsdriver.exists(parseInt(driver.id))
        if (!existsdriver) {
            return { driverNotFounded: true }
        }
        await this.updateDriver.update({ id: parseInt(driver.id), status: false })
        return { driverNotFounded: false }
    }
}