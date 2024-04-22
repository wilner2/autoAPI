import { Entity, PrimaryGeneratedColumn, Column } from "typeorm"

@Entity('registro')
export class RecordModel {
    @PrimaryGeneratedColumn()
    id!: number

    @Column({ nullable: false })
    idAutomovel!: number

    @Column({ nullable: false })
    idMotorista!: number

    @Column({ nullable: false })
    desc!: string

    @Column({ nullable: false, type: 'timestamptz' })
    inicio!: Date

    @Column({ type: 'timestamptz', nullable: true })
    fim!: Date

    @Column({ nullable: false })
    inProgress!: boolean

}