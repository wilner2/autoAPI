import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from "typeorm"
import { VehicleModel } from "./vehicle"
import { DriverModel } from "./driver"

@Entity('registro')
export class RecordModel {
    @PrimaryGeneratedColumn()
    id!: number

    @Column({ nullable: false })
    desc!: string

    @Column({ nullable: false, type: 'timestamptz' })
    inicio!: Date

    @Column({ type: 'timestamptz', nullable: true })
    fim!: Date

    @Column({ nullable: false })
    inProgress!: boolean

    @ManyToOne(() => DriverModel, driver => driver.registro)
    @JoinColumn()
    motorista!: DriverModel

    @ManyToOne(() => VehicleModel, veiculo => veiculo.registro)
    @JoinColumn()
    automovel!: VehicleModel
}