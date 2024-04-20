import { Entity, PrimaryGeneratedColumn, Column, Unique } from "typeorm"

@Entity('automovel')
export class Auto {
    @PrimaryGeneratedColumn()
    id!: string

    @Column()
    cor!: string

    @Column()
    marca!: string

    @Column({ unique: true })
    placa!: string

    @Column()
    createdAt!: Date

    @Column()
    status!: boolean

}