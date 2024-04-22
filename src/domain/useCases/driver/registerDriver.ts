import { CreateDriver } from "@/domain/contracts/repos/driver";
import { RegisterDriver } from "@/domain/contracts/useCases/driver";

export class RegisterDriverCase implements RegisterDriver {
    constructor(private createDriver: CreateDriver) { }

    async execute(vehicle: RegisterDriver.Input): Promise<void> {
        await this.createDriver.create(vehicle);
    }
}
