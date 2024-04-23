import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm"
import { RecordModel } from "./record"

@Entity('automovel')
export class VehicleModel {
    @PrimaryGeneratedColumn()
    id!: number

    @Column({ nullable: false })
    cor!: string

    @Column({ nullable: false })
    marca!: string

    @Column({ unique: true, nullable: false })
    placa!: string

    @Column({ type: 'timestamptz' })
    created_at!: Date

    @Column({ nullable: false })
    status!: boolean

    @OneToMany(() => RecordModel, record => record.automovel, { cascade: true })
    registro!: RecordModel[]

}