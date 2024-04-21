import { Entity, PrimaryGeneratedColumn, Column, Unique } from "typeorm"

@Entity('automovel')
export class Vehicle {
    @PrimaryGeneratedColumn()
    id!: Date

    @Column()
    cor!: string

    @Column()
    marca!: string

    @Column({ unique: true })
    placa!: string

    @Column({ type: 'timestamptz' })
    created_at!: Date

    @Column()
    status!: boolean

}