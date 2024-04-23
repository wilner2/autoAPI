import { Entity, PrimaryGeneratedColumn, Column, JoinColumn, OneToOne } from "typeorm"
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

    @OneToOne(() => DriverModel)
    @JoinColumn()
    motorista!: DriverModel

    @OneToOne(() => VehicleModel)
    @JoinColumn()
    automovel!: VehicleModel
}