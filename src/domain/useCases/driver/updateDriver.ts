import { ExistsDriver, UpdateDriver } from "@/domain/contracts/repos/driver";
import { UpdateDriverContract } from "@/domain/contracts/useCases/driver";

export class UpdateDriverCase implements UpdateDriverContract {
    constructor(private updatedriver: UpdateDriver, private existsDriver: ExistsDriver) { }

    async execute(driver: UpdateDriverContract.Input): UpdateDriverContract.Output {
        const existsDriver = await this.existsDriver.exists(driver.id)
        if (!existsDriver) {
            return { driverNotFounded: true }
        }

        await this.updatedriver.update({ nome: driver.nome, })
        return { driverNotFounded: false }
    }
}