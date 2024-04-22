import { ExistsDriver, UpdateDriver } from "@/domain/contracts/repos/driver";
import { UpdatingDriver } from "@/domain/contracts/useCases/driver";

export class UpdateDriverCase implements UpdatingDriver {
    constructor(private updatedriver: UpdateDriver, private existsDriver: ExistsDriver) { }

    async execute(driver: UpdatingDriver.Input): UpdatingDriver.Output {
        const existsDriver = await this.existsDriver.exists(driver.id)
        if (!existsDriver) {
            return { driverNotFounded: true }
        }

        await this.updatedriver.update({ nome: driver.nome, })
        return { driverNotFounded: false }
    }
}