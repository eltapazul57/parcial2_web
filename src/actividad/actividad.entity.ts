/* eslint-disable prettier/prettier */
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class ActividadEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    titulo:string;

    @Column()
    fecha: string;

    @Column({type: 'int'})
    cupoMaximo: number;

    @Column({type: 'int'})
    estado: number;
}
