import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm"
import { RecordModel } from "./record"

@Entity('motorista')
export class DriverModel {
    @PrimaryGeneratedColumn()
    id!: number

    @Column({ nullable: false })
    nome!: string

    @Column({ type: 'timestamptz' })
    created_at!: Date

    @Column({ nullable: false })
    status!: boolean

    @OneToMany(() => RecordModel, record => record.motorista, { cascade: true })
    registro!: RecordModel[]

}