import { Entity, PrimaryGeneratedColumn, Column, Unique } from "typeorm"

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

}