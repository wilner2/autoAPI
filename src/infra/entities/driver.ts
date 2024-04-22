import { Entity, PrimaryGeneratedColumn, Column } from "typeorm"

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

}